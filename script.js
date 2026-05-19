// Wait for everything to load
window.addEventListener('load', () => {
    
    // ========== INITIALIZATION SCREEN (1.5s) ==========
    const initScreen = document.getElementById('initScreen');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.querySelector('.init-progress-bar');
    
    if (progressBar) {
        // Animate progress bar to 100% over 1.5s
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 100);
    }
    
    // Hide init screen after 1.5s and show main content
    setTimeout(() => {
        if (initScreen) {
            initScreen.classList.add('fade-out');
            setTimeout(() => {
                initScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                    }, 50);
                }
                // Trigger all animations after content is visible
                initializeAllAnimations();
            }, 500);
        }
    }, 1500);
    
    // ========== INITIALIZE ALL ANIMATIONS ==========
    function initializeAllAnimations() {
        
        // Scroll Progress Bar
        const progressBarScroll = document.querySelector('.progress-bar');
        if (progressBarScroll) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                progressBarScroll.style.width = progress + '%';
            });
        }
        
        // Animated Numbers Counter (Stats)
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateNumbers = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateNumber();
            });
        };
        
        // Trigger number animation when stats are in view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) statsObserver.observe(heroStats);
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width && !bar.classList.contains('animated')) {
                    bar.style.setProperty('--skill-width', width + '%');
                    bar.classList.add('animate');
                    bar.classList.add('animated');
                }
            });
        };
        
        // Trigger skill animation on scroll
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const skillsSection = document.querySelector('#skills');
        if (skillsSection) skillsObserver.observe(skillsSection);
        
        // GSAP Scroll Animations
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade-up animations for all cards
        gsap.utils.toArray('.glass-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: -30,
                duration: 0.5
            });
        });
        
        // Hero title animation
        gsap.from('.hero-title', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-badge', {
            duration: 0.6,
            scale: 0,
            opacity: 0,
            delay: 0.2,
            ease: 'back.out(1.2)'
        });
        
        gsap.from('.hero-info', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: 0.4
        });
        
        gsap.from('.hero-stats', {
            duration: 0.6,
            scale: 0.9,
            opacity: 0,
            delay: 0.6
        });
        
        gsap.from('.hero-cta', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: 0.8
        });
        
        // Smooth scroll for buttons
        const exploreBtn = document.getElementById('exploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        
        const contactBtn = document.getElementById('contactBtn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        
        // Footer navigation smooth scroll
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Copy email functionality
        const copyButtons = document.querySelectorAll('.btn-copy');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.getAttribute('data-email');
                if (email) {
                    navigator.clipboard.writeText(email).then(() => {
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Copied!';
                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                        }, 2000);
                    });
                }
            });
        });
        
        // Project buttons - show project info
        const projectBtns = document.querySelectorAll('.btn-project');
        const projectDetails = {
            'sec-framework': 'Security Analysis Framework: Comprehensive tool with automated CVE correlation, risk scoring (CVSS v3), and executive reporting. Built with Python, Django, and PostgreSQL.',
            'net-lab': 'Network Hardening Lab: Virtual environment with pfSense firewall, Snort IDS, VLAN segmentation, and ELK stack for SIEM. Successfully mitigated DDoS and lateral movement attacks.',
            'threat-dash': 'Threat Intelligence Dashboard: Real-time aggregation from 15+ OSINT feeds (AlienVault, VirusTotal, etc.) with interactive graphs and email alerts.',
            'pentest-suite': 'Automated Pentesting Suite: 25+ scripts for recon (subdomain enumeration, port scanning), vulnerability scanning, and post-exploitation reporting.',
            'malware-sandbox': 'Malware Analysis Sandbox: Cuckoo-based environment with behavior monitoring, network traffic analysis, and YARA rule matching.',
            'waf': 'Web Application Firewall: Custom ModSecurity WAF with OWASP CRS, SQLi/XSS prevention, rate limiting, and real-time blocking capabilities.'
        };
        
        projectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const projectKey = btn.getAttribute('data-project');
                if (projectKey && projectDetails[projectKey]) {
                    alert(`📁 Project Details:\n\n${projectDetails[projectKey]}\n\nContact me for full source code and case study.`);
                } else {
                    alert(`✨ Full project details available upon request. Please contact me for more information!`);
                }
            });
        });
        
        // Parallax effect for gradient orbs
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = 20 + index * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                orb.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            });
        });
        
        // Hover tilt effect for project cards (lightweight)
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
        
        // Timeline item hover effect
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    duration: 0.3
                });
            });
        });
        
        // Console greeting
        console.log('%c🚀 Farhan Khan | Cybersecurity Portfolio', 'color: #00e5ff; font-size: 18px; font-weight: bold; font-family: monospace;');
        console.log('%c⚡ Fully Loaded | 1.5s Init Screen | Responsive Design', 'color: #8b9bae; font-size: 12px;');
        console.log('%c📧 Contact: t06235015@gmail.com', 'color: #00e5ff; font-size: 12px;');
        
        // Dynamic year in footer
        const footerYear = document.querySelector('.footer-content p');
        if (footerYear) {
            const year = new Date().getFullYear();
            footerYear.innerHTML = `© ${year} Farhan Khan | Securing the digital frontier, one vulnerability at a time.`;
        }
        
        // Add loading complete class to body
        document.body.classList.add('loaded');
    }
});

// Preload images and resources
window.addEventListener('beforeunload', () => {
    // Cleanup if needed
});