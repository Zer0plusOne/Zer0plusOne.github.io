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

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://raw.githubusercontent.com/Zer0plusOne/Zer0plusOne/main/README.md')
        .then(response => response.text())
        .then(data => {
            const htmlContent = marked.parse(data);
            document.getElementById('github-readme').innerHTML = htmlContent;
        })
        .catch(error => console.error('Error al cargar el README:', error));
});