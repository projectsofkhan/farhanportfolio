// FULL TERMINAL EMULATION + MATRIX + GSAP + UNLOCK SYSTEM
(function() {
    // ---------- MATRIX RAIN ----------
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = [];
    for(let i = 0; i < columns; i++) drops[i] = 1;

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;
        for(let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for(let i = 0; i < columns; i++) drops[i] = 1;
    });

    // ---------- CUSTOM CURSOR ----------
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    // ---------- PARTICLES GENERATOR ----------
    const particlesContainer = document.getElementById('particles');
    for(let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = Math.random() * 8 + 5 + 's';
        particlesContainer.appendChild(particle);
    }

    // ---------- TYPED.JS HERO ----------
    new Typed('#typed-output', {
        strings: ['whoami', 'cat about.txt', 'ls -la', 'sudo cyber_skills', 'echo "Hello World!"'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: false,
        onComplete: (self) => { self.cursor = false; }
    });

    // ---------- GSAP SCROLL ANIMATIONS ----------
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // ---------- RADIAL PROGRESS SKILLS (Canvas drawing) ----------
    function drawRadial(canvasElem, percent) {
        const ctx = canvasElem.getContext('2d');
        const centerX = 60, centerY = 60, radius = 50;
        let startAngle = -0.5 * Math.PI;
        let endAngle = startAngle + (percent / 100) * 2 * Math.PI;
        ctx.clearRect(0, 0, 120, 120);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#1e2a3a';
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    document.querySelectorAll('.radial-progress canvas').forEach(canvas => {
        const parent = canvas.closest('.radial-progress');
        const percent = parseInt(parent.getAttribute('data-progress') || 85);
        drawRadial(canvas, percent);
    });

    // ---------- PROJECT FILTERS ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-tile');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            projects.forEach(proj => {
                if(filter === 'all' || proj.getAttribute('data-category') === filter) {
                    proj.style.display = 'block';
                    gsap.from(proj, { scale: 0.8, opacity: 0, duration: 0.4 });
                } else {
                    proj.style.display = 'none';
                }
            });
        });
    });

    // ---------- MODAL SYSTEM ----------
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    document.querySelectorAll('.modal-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            if(projectId === 'project1') {
                modalBody.innerHTML = `<h2>Security Analysis Framework</h2><p>Detailed vulnerability assessment suite with automated CVE correlation, risk scoring (CVSS), and executive reporting.</p><p><strong>Technologies:</strong> Python, OWASP ZAP, NIST framework, PostgreSQL.</p><p>Impact: Reduced false positives by 40% in test environments.</p>`;
            } else {
                modalBody.innerHTML = `<h2>Network Hardening Lab</h2><p>Virtualized corporate network with segmented VLANs, Snort IDS, pfSense firewall, and SIEM logging (ELK stack).</p><p>Attack simulation: Prevented DDoS and lateral movement attacks during red team exercises.</p>`;
            }
            modal.style.display = 'block';
        });
    });
    document.querySelector('.close-modal').addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

    // ---------- TIMELINE UNLOCK LOGIC (simulate progress) ----------
    let completedProjects = 1; // start with 1 done, after 2 projects unlocked timeline
    function updateTimelineUnlock() {
        const lockedItems = document.querySelectorAll('.timeline-item.locked');
        if(completedProjects >= 2) {
            lockedItems.forEach(item => {
                item.classList.remove('locked');
                item.classList.add('unlocked');
                gsap.to(item, { opacity: 1, filter: 'blur(0px)', duration: 0.5 });
                item.querySelector('.timeline-status').innerHTML = '✅ Unlocked';
            });
            document.querySelector('.unlock-hint').innerHTML = '🎉 All milestones unlocked! Great progress!';
        }
    }
    // Simulate unlocking when projects are clicked? Add event on project tiles to increment counter
    document.querySelectorAll('.project-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            if(completedProjects < 2) completedProjects++;
            updateTimelineUnlock();
        });
    });
    updateTimelineUnlock();

    // ---------- UPTIME COUNTER ----------
    let startTime = Date.now();
    setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const days = Math.floor(elapsed / 86400);
        const hours = Math.floor((elapsed % 86400) / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        document.getElementById('uptime').innerText = `${days}d ${hours}h ${mins}m`;
        let skillsCount = document.querySelectorAll('.skill-card').length;
        document.getElementById('skillsLoaded').innerText = skillsCount;
    }, 1000);

    // ---------- COPY EMAIL ----------
    document.getElementById('copyEmailBtn')?.addEventListener('click', () => {
        navigator.clipboard.writeText('t06235015@gmail.com');
        alert('📧 Email copied to clipboard!');
    });

    // ---------- AOS INIT ----------
    AOS.init({ duration: 1000, once: false, mirror: true });

    // ---------- GLITCH HOVER EFFECT ON NAVIGATION CMDS ----------
    document.querySelectorAll('.nav-cmd').forEach(cmd => {
        cmd.addEventListener('mouseenter', () => {
            gsap.to(cmd, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
        });
    });
})();