// script.js
// Smooth navigation + terminal vibe interactions
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor follow (optional, but cool)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
        });
    }

    // Smooth scroll for navigation links with offset for header
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                // optional: update URL without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // If there is an initial hash on load, scroll smoothly
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            setTimeout(() => {
                const offset = 80;
                const pos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }, 200);
        }
    }

    // Terminal like effect — console greeting
    console.log("%c[farhan@portfolio]$ Welcome to my cybersecurity portfolio.", "color: #0f0; font-size: 14px; font-family: monospace;");
    console.log("%c>_ System ready. Explore my skills, projects, and journey.", "color: #00e5ff;");

    // Add a tiny interactive effect for project buttons (optional)
    const projectBtns = document.querySelectorAll('.project-card .btn');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("📁 Full case study & source code available upon request. Let's connect!");
        });
    });
});