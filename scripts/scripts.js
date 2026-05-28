function showSection(sectionId) {

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

const README_SOURCE = {
    owner: 'Zer0plusOne',
    repo: 'Zer0plusOne',
    branch: 'main',
    path: 'README.md'
};

const README_RAW_URL = `https://raw.githubusercontent.com/${README_SOURCE.owner}/${README_SOURCE.repo}/${README_SOURCE.branch}/${README_SOURCE.path}`;
const README_RAW_BASE = `https://raw.githubusercontent.com/${README_SOURCE.owner}/${README_SOURCE.repo}/${README_SOURCE.branch}/`;
const README_BLOB_BASE = `https://github.com/${README_SOURCE.owner}/${README_SOURCE.repo}/blob/${README_SOURCE.branch}/`;
const GITHUB_BLOB_OR_RAW_RE = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/i;
const ABSOLUTE_URL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
const SKILL_CARD_OVERRIDES = [
    {
        filename: 'htbskillcard.svg',
        src: 'https://raw.githubusercontent.com/Zer0plusOne/Zer0plusOne/main/SkillCards/HtbSkillCard.svg',
        align: 'left',
        height: '170',
        marginBottom: '8px'
    },
    {
        filename: 'defensiveskillcard.svg',
        src: 'https://raw.githubusercontent.com/Zer0plusOne/Zer0plusOne/main/SkillCards/DefensiveSkillCard.svg',
        align: 'center',
        height: '190',
        marginBottom: '8px'
    }
];

function normalizeGithubAssetUrl(url) {
    if (!url) {
        return '';
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl || trimmedUrl.startsWith('data:')) {
        return trimmedUrl;
    }

    const githubBlobMatch = trimmedUrl.match(GITHUB_BLOB_OR_RAW_RE);
    if (githubBlobMatch) {
        const [, owner, repo, branch, filePath] = githubBlobMatch;
        return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
    }

    if (ABSOLUTE_URL_RE.test(trimmedUrl) || trimmedUrl.startsWith('#')) {
        return trimmedUrl;
    }

    const normalizedRelativePath = trimmedUrl.replace(/^\/+/, '');
    return new URL(normalizedRelativePath, README_RAW_BASE).href;
}

function normalizeGithubLinkUrl(url) {
    if (!url) {
        return '';
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl || ABSOLUTE_URL_RE.test(trimmedUrl) || trimmedUrl.startsWith('#')) {
        return trimmedUrl;
    }

    const normalizedRelativePath = trimmedUrl.replace(/^\/+/, '');
    return new URL(normalizedRelativePath, README_BLOB_BASE).href;
}

function postProcessReadme(container) {
    const imageNodes = container.querySelectorAll('img');
    imageNodes.forEach((img) => {
        const source = img.getAttribute('src');
        if (source) {
            img.setAttribute('src', normalizeGithubAssetUrl(source));
        }

        const sourceSet = img.getAttribute('srcset');
        if (sourceSet) {
            const normalizedSourceSet = sourceSet
                .split(',')
                .map((entry) => {
                    const [entryUrl, descriptor] = entry.trim().split(/\s+/, 2);
                    const normalizedUrl = normalizeGithubAssetUrl(entryUrl);
                    return descriptor ? `${normalizedUrl} ${descriptor}` : normalizedUrl;
                })
                .join(', ');

            img.setAttribute('srcset', normalizedSourceSet);
        }
    });

    const linkNodes = container.querySelectorAll('a[href]');
    linkNodes.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) {
            return;
        }

        const normalizedHref = normalizeGithubLinkUrl(href);
        link.setAttribute('href', normalizedHref);
        if (/^https?:\/\//i.test(normalizedHref)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    const imageOverrides = container.querySelectorAll('img[src]');
    imageOverrides.forEach((img) => {
        const source = (img.getAttribute('src') || '').toLowerCase();
        const cardOverride = SKILL_CARD_OVERRIDES.find((rule) => source.includes(rule.filename));
        if (!cardOverride) {
            return;
        }

        img.setAttribute('src', cardOverride.src);
        img.setAttribute('align', cardOverride.align);
        img.setAttribute('height', cardOverride.height);

        // Keep skillcards stable across browsers (align attribute is obsolete/inconsistent).
        img.style.display = 'block';
        img.style.float = 'left';
        img.style.clear = 'left';
        img.style.marginTop = '0';
        img.style.marginRight = '0';
        img.style.marginLeft = '0';
        img.style.marginBottom = '0';

        img.style.borderRadius = '7px';
        if (cardOverride.marginBottom) {
            img.style.marginBottom = cardOverride.marginBottom;
        }
    });
}

function highlightReadmeCode(container) {
    if (!window.hljs) {
        return;
    }

    const codeBlocks = container.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
        window.hljs.highlightElement(block);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetch(README_RAW_URL)
        .then(response => response.text())
        .then(data => {
            const htmlContent = marked.parse(data);
            const readmeContainer = document.getElementById('github-readme');
            readmeContainer.innerHTML = htmlContent;
            postProcessReadme(readmeContainer);
            highlightReadmeCode(readmeContainer);
        })
        .catch(error => console.error('Error al cargar el README:', error));
});
