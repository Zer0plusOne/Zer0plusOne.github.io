const BOOKSHELF_DIR = "Bookshelf";
const MANIFEST_FILES = [`${BOOKSHELF_DIR}/index.json`, `${BOOKSHELF_DIR}/bookshelf.json`];
const LANGUAGE_ALIASES = {
    "shell-session": "bash",
    shell: "bash",
    sh: "bash",
    zsh: "bash",
    console: "bash",
    terminal: "bash",
    ls: "bash",
    undefined: "plaintext",
    txt: "plaintext",
    text: "plaintext"
};
const LANGUAGE_LABELS = {
    es: "ES",
    en: "EN"
};
const PINNED_WELCOME_FILENAME = "welcome.md";
const GRID_LIMITS = {
    normal: { maxColumns: 10, maxRows: 9, targetCellPx: 260 },
    lite: { maxColumns: 8, maxRows: 6, targetCellPx: 340 }
};

let bookItems = [];
let currentLanguage = null;
let gridResizeTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    enablePerformanceMode();
    buildBackgroundGrid();
    bindViewportHandlers();
    bindUI();
    loadBookshelf();
});

function buildBackgroundGrid() {
    const grid = document.querySelector(".grid-container");
    if (!grid) {
        return;
    }

    const isLiteMode = document.body.classList.contains("perf-lite");
    const limits = isLiteMode ? GRID_LIMITS.lite : GRID_LIMITS.normal;
    const viewportWidth = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0);
    const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);

    const columns = clamp(Math.ceil(viewportWidth / limits.targetCellPx), 4, limits.maxColumns);
    const rows = clamp(Math.ceil(viewportHeight / limits.targetCellPx), 3, limits.maxRows);
    const totalCells = columns * rows;

    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < totalCells; i += 1) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        fragment.appendChild(cell);
    }

    grid.innerHTML = "";
    grid.appendChild(fragment);
}

function bindViewportHandlers() {
    window.addEventListener(
        "resize",
        () => {
            if (gridResizeTimer) {
                window.clearTimeout(gridResizeTimer);
            }
            gridResizeTimer = window.setTimeout(() => {
                buildBackgroundGrid();
            }, 120);
        },
        { passive: true }
    );
}

function enablePerformanceMode() {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCoreCount = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    const lowMemoryDevice = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;

    if (reduceMotion || lowCoreCount || lowMemoryDevice) {
        document.body.classList.add("perf-lite");
    }
}

function bindUI() {
    const refreshButton = document.getElementById("refresh-books");
    if (refreshButton) {
        refreshButton.addEventListener("click", () => {
            loadBookshelf(true);
        });
    }
}

async function loadBookshelf(forceReload = false) {
    setStatus("Loading bookshelf...");

    try {
        const files = await discoverBooks(forceReload);
        bookItems = files;

        if (!bookItems.length) {
            renderEmptyShelf();
            setStatus("No markdown files found in /Bookshelf.");
            return;
        }

        renderBookList(bookItems);
        setStatus(`${bookItems.length} markdown file(s) loaded.`);

        const params = new URLSearchParams(window.location.search);
        const requested = params.get("book");
        const requestedLang = normalizeLanguageCode(params.get("lang"));
        const initial = findInitialBook(requested, bookItems);
        const initialBook = initial ? initial.item : getDefaultBook(bookItems);
        const initialLang = requestedLang || (initial ? initial.lang : null);
        openBook(initialBook, false, initialLang);
    } catch (error) {
        console.error("Bookshelf load error:", error);
        renderReaderMessage("No se pudo cargar Bookshelf. Revisa la consola para mas detalles.");
        setStatus("Error loading bookshelf.");
    }
}

async function discoverBooks(forceReload) {
    const fromManifest = await loadFromManifest(forceReload);
    if (fromManifest.length) {
        return fromManifest;
    }

    const fromGitHubApi = await loadFromGitHubApi(forceReload);
    return fromGitHubApi;
}

async function loadFromManifest(forceReload) {
    for (const manifestPath of MANIFEST_FILES) {
        try {
            const response = await fetch(withCacheBust(manifestPath, forceReload), { cache: "no-store" });
            if (!response.ok) {
                continue;
            }

            const raw = await response.json();
            const files = normalizeManifest(raw);
            if (files.length) {
                return files;
            }
        } catch (_error) {
            // Ignore and try the next strategy.
        }
    }

    return [];
}

async function loadFromGitHubApi(forceReload) {
    const repo = inferGitHubRepo();
    if (!repo) {
        return [];
    }

    const endpoint = `https://api.github.com/repos/${repo.owner}/${repo.name}/contents/${BOOKSHELF_DIR}`;

    try {
        const response = await fetch(withCacheBust(endpoint, forceReload), { cache: "no-store" });
        if (!response.ok) {
            return [];
        }

        const files = await response.json();
        if (!Array.isArray(files)) {
            return [];
        }

        return files
            .filter((item) => item.type === "file" && item.name.toLowerCase().endsWith(".md"))
            .map((item) => ({
                id: item.path,
                name: item.name,
                title: prettifyBookTitle(item.name),
                source: item.download_url || item.html_url
            }))
            .filter((item) => Boolean(item.source))
            .sort(compareBooksWithPinnedWelcome);
    } catch (_error) {
        return [];
    }
}

function inferGitHubRepo() {
    const host = window.location.hostname.toLowerCase();
    if (!host.endsWith(".github.io")) {
        return null;
    }

    const owner = host.replace(".github.io", "");
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const repoName = pathSegments.length > 1 ? pathSegments[0] : `${owner}.github.io`;

    return { owner, name: repoName };
}

function normalizeManifest(rawManifest) {
    const source = Array.isArray(rawManifest) ? rawManifest : rawManifest && Array.isArray(rawManifest.files) ? rawManifest.files : [];
    const mapped = source
        .map((entry) => normalizeManifestEntry(entry))
        .filter(Boolean);

    const uniqueById = [];
    const seen = new Set();
    for (const item of mapped) {
        if (!seen.has(item.id)) {
            seen.add(item.id);
            uniqueById.push(item);
        }
    }

    return uniqueById.sort(compareBooksWithPinnedWelcome);
}

function normalizeManifestEntry(entry) {
    if (typeof entry === "string") {
        const cleanPath = sanitizePath(entry);
        if (!cleanPath || !cleanPath.toLowerCase().endsWith(".md")) {
            return null;
        }

        const name = cleanPath.split("/").pop();
        const filePath = cleanPath.startsWith(`${BOOKSHELF_DIR}/`) ? cleanPath : `${BOOKSHELF_DIR}/${cleanPath}`;

        return {
            id: filePath,
            name,
            title: prettifyBookTitle(name),
            source: filePath
        };
    }

    if (entry && typeof entry === "object") {
        if (entry.variants && typeof entry.variants === "object") {
            const variants = {};
            Object.keys(entry.variants).forEach((langKey) => {
                const normalizedLang = normalizeLanguageCode(langKey);
                const variantPath = sanitizePath(entry.variants[langKey]);
                if (!normalizedLang || !variantPath || !variantPath.toLowerCase().endsWith(".md")) {
                    return;
                }

                const fullPath = variantPath.startsWith(`${BOOKSHELF_DIR}/`) ? variantPath : `${BOOKSHELF_DIR}/${variantPath}`;
                variants[normalizedLang] = {
                    id: fullPath,
                    name: fullPath.split("/").pop(),
                    source: fullPath
                };
            });

            const availableLanguages = Object.keys(variants);
            if (!availableLanguages.length) {
                return null;
            }

            const defaultLanguage =
                normalizeLanguageCode(entry.defaultLanguage) ||
                (availableLanguages.includes("es") ? "es" : availableLanguages[0]);
            const fallbackVariant = variants[defaultLanguage] || variants[availableLanguages[0]];
            const baseTitle = entry.title || prettifyBookTitle((fallbackVariant && fallbackVariant.name) || "Untitled");

            return {
                id: sanitizePath(entry.id || `book-${slugify(baseTitle)}`),
                name: `${baseTitle}.md`,
                title: baseTitle,
                source: fallbackVariant.source,
                defaultLanguage,
                variants
            };
        }

        const file = sanitizePath(entry.path || entry.file || "");
        if (!file || !file.toLowerCase().endsWith(".md")) {
            return null;
        }

        const name = file.split("/").pop();
        const filePath = file.startsWith(`${BOOKSHELF_DIR}/`) ? file : `${BOOKSHELF_DIR}/${file}`;

        return {
            id: filePath,
            name,
            title: entry.title || prettifyBookTitle(name),
            source: filePath
        };
    }

    return null;
}

function sanitizePath(input) {
    if (!input) {
        return "";
    }

    return input
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")
        .split("/")
        .filter((part) => part && part !== "." && part !== "..")
        .join("/");
}

function renderBookList(items) {
    const list = document.getElementById("book-list");
    if (!list) {
        return;
    }

    list.innerHTML = "";

    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "book-link";
        button.dataset.bookId = item.id;
        button.innerHTML = `${escapeHtml(item.title)}<small>${escapeHtml(getBookSubtitle(item))}</small>`;
        button.addEventListener("click", () => openBook(item, true));
        fragment.appendChild(button);
    });

    list.appendChild(fragment);
}

async function openBook(item, pushHistory, forcedLanguage = null) {
    if (!item) {
        return;
    }

    const resolved = resolveBookVariant(item, forcedLanguage || currentLanguage);
    if (!resolved) {
        return;
    }

    currentLanguage = resolved.language || null;

    setActiveBook(item.id);
    renderLanguageSwitcher(item, resolved.language);
    setReaderHeader(item.title, buildReaderMeta(resolved));
    renderReaderMessage("Rendering markdown...");

    try {
        const response = await fetch(resolved.source, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Failed to load ${resolved.source}`);
        }

        const markdown = await response.text();
        const html = window.marked ? marked.parse(markdown) : `<pre>${escapeHtml(markdown)}</pre>`;
        renderReaderHTML(html);
        applySyntaxHighlighting();

        if (pushHistory) {
            const url = new URL(window.location.href);
            url.searchParams.set("book", item.id);
            if (resolved.language) {
                url.searchParams.set("lang", resolved.language);
            } else {
                url.searchParams.delete("lang");
            }
            window.history.replaceState({}, "", url);
        }
    } catch (error) {
        console.error("Book open error:", error);
        renderReaderMessage("No se pudo abrir el archivo seleccionado.");
    }
}

function setActiveBook(bookId) {
    const buttons = document.querySelectorAll(".book-link");
    buttons.forEach((button) => {
        button.classList.toggle("active", button.dataset.bookId === bookId);
    });
}

function renderEmptyShelf() {
    const list = document.getElementById("book-list");
    if (list) {
        list.innerHTML = "<p class=\"reader-placeholder\">Bookshelf is empty for now.</p>";
    }

    renderLanguageSwitcher(null, null);
    setReaderHeader("Bookshelf vacio", "Agrega archivos .md dentro de /Bookshelf.");
    renderReaderMessage("Tip: puedes crear archivos como <code>Bookshelf/intro.md</code> o <code>Bookshelf/my-notes.md</code>.");
}

function renderReaderHTML(content) {
    const reader = document.getElementById("reader-content");
    if (reader) {
        reader.innerHTML = content;
    }
}

function applySyntaxHighlighting() {
    if (!window.hljs) {
        return;
    }

    const codeBlocks = document.querySelectorAll("#reader-content pre code");
    codeBlocks.forEach((block) => {
        normalizeCodeLanguage(block);
        window.hljs.highlightElement(block);
    });
}

function normalizeCodeLanguage(block) {
    const languageClass = Array.from(block.classList).find((name) => name.startsWith("language-"));
    if (!languageClass) {
        return;
    }

    const currentLanguage = languageClass.replace("language-", "").toLowerCase();
    const normalizedLanguage = LANGUAGE_ALIASES[currentLanguage] || currentLanguage;

    if (normalizedLanguage !== currentLanguage) {
        block.classList.remove(languageClass);
        block.classList.add(`language-${normalizedLanguage}`);
    }

    if (!window.hljs.getLanguage(normalizedLanguage)) {
        block.classList.remove(`language-${normalizedLanguage}`);
    }
}

function renderReaderMessage(message) {
    const reader = document.getElementById("reader-content");
    if (reader) {
        reader.innerHTML = `<p class="reader-placeholder">${message}</p>`;
    }
}

function setReaderHeader(title, meta) {
    const titleEl = document.getElementById("reader-title");
    const metaEl = document.getElementById("reader-meta");

    if (titleEl) {
        titleEl.textContent = title;
    }
    if (metaEl) {
        metaEl.textContent = meta;
    }
}

function setStatus(message) {
    const status = document.getElementById("bookshelf-status");
    if (status) {
        status.textContent = message;
    }
}

function getDefaultBook(items) {
    if (!Array.isArray(items) || !items.length) {
        return null;
    }

    return items.find(isPinnedWelcomeBook) || items[0];
}

function compareBooksWithPinnedWelcome(a, b) {
    const aPinned = isPinnedWelcomeBook(a);
    const bPinned = isPinnedWelcomeBook(b);

    if (aPinned && !bPinned) {
        return -1;
    }
    if (!aPinned && bPinned) {
        return 1;
    }

    return (a.title || "").localeCompare(b.title || "");
}

function isPinnedWelcomeBook(item) {
    if (!item) {
        return false;
    }

    const normalizedName = String(item.name || "").toLowerCase();
    const normalizedId = String(item.id || "").toLowerCase();
    return (
        normalizedName === PINNED_WELCOME_FILENAME ||
        normalizedId === PINNED_WELCOME_FILENAME ||
        normalizedId.endsWith(`/${PINNED_WELCOME_FILENAME}`)
    );
}

function getBookSubtitle(item) {
    if (!item) {
        return "";
    }

    if (item.variants) {
        return Object.keys(item.variants)
            .map((lang) => languageLabel(lang))
            .join(" / ");
    }

    return item.name;
}

function resolveBookVariant(item, preferredLanguage) {
    if (!item) {
        return null;
    }

    if (!item.variants) {
        return {
            language: null,
            source: item.source,
            name: item.name
        };
    }

    const availableLanguages = Object.keys(item.variants);
    if (!availableLanguages.length) {
        return null;
    }

    const normalizedPreferred = normalizeLanguageCode(preferredLanguage);
    const selectedLanguage =
        (normalizedPreferred && item.variants[normalizedPreferred] && normalizedPreferred) ||
        (item.defaultLanguage && item.variants[item.defaultLanguage] && item.defaultLanguage) ||
        (availableLanguages.includes("es") ? "es" : availableLanguages[0]);
    const selectedVariant = item.variants[selectedLanguage];

    if (!selectedVariant) {
        return null;
    }

    return {
        language: selectedLanguage,
        source: selectedVariant.source,
        name: selectedVariant.name
    };
}

function buildReaderMeta(variant) {
    if (!variant) {
        return "";
    }

    if (!variant.language) {
        return `Source: ${variant.name}`;
    }

    return `Source: ${variant.name} | Language: ${languageLabel(variant.language)}`;
}

function renderLanguageSwitcher(item, activeLanguage) {
    const switcher = document.getElementById("language-switcher");
    if (!switcher) {
        return;
    }

    switcher.innerHTML = "";
    switcher.classList.remove("visible");

    if (!item || !item.variants || Object.keys(item.variants).length < 2) {
        return;
    }

    const preferredOrder = ["es", "en"];
    const languages = Object.keys(item.variants).sort((a, b) => {
        const indexA = preferredOrder.indexOf(a);
        const indexB = preferredOrder.indexOf(b);
        const rankA = indexA === -1 ? 99 : indexA;
        const rankB = indexB === -1 ? 99 : indexB;
        return rankA === rankB ? a.localeCompare(b) : rankA - rankB;
    });

    languages.forEach((language) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "lang-tab";
        button.textContent = languageLabel(language);
        if (language === activeLanguage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            openBook(item, true, language);
        });

        switcher.appendChild(button);
    });

    switcher.classList.add("visible");
}

function findInitialBook(requested, items) {
    if (!requested) {
        return null;
    }

    for (const item of items) {
        if (item.id === requested || item.name === requested) {
            return { item, lang: null };
        }
    }

    for (const item of items) {
        if (!item.variants) {
            continue;
        }

        const entries = Object.entries(item.variants);
        for (const [lang, variant] of entries) {
            if (variant.id === requested || variant.name === requested) {
                return { item, lang };
            }
        }
    }

    return null;
}

function normalizeLanguageCode(value) {
    if (!value || typeof value !== "string") {
        return null;
    }

    const normalized = value.trim().toLowerCase();
    if (!normalized) {
        return null;
    }

    const aliases = {
        eng: "en",
        english: "en",
        esp: "es",
        spa: "es",
        spanish: "es",
        castellano: "es",
        espanol: "es"
    };

    return aliases[normalized] || normalized;
}

function languageLabel(language) {
    const normalized = normalizeLanguageCode(language);
    if (!normalized) {
        return "";
    }

    return LANGUAGE_LABELS[normalized] || normalized.toUpperCase();
}

function withCacheBust(url, enabled) {
    if (!enabled) {
        return url;
    }

    const suffix = `ts=${Date.now()}`;
    return url.includes("?") ? `${url}&${suffix}` : `${url}?${suffix}`;
}

function prettifyBookTitle(filename) {
    return filename
        .replace(/\.md$/i, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
