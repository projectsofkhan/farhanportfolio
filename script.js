// Wait for everything to load
(function() {
    
    // ========== PRELOADER SYSTEM ==========
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const progressLine = document.querySelector('.progress-line');
    const loadingPercent = document.querySelector('.loading-percent');
    
    let progress = 0;
    const preloaderDuration = 1500; // 1.5 seconds
    const intervalTime = 15;
    const steps = preloaderDuration / intervalTime;
    const increment = 100 / steps;
    
    // Animate progress bar
    const progressInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Fade out preloader
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Trigger entrance animations
                    document.body.classList.add('loaded');
                    initializePortfolio();
                }, 500);
            }, 100);
        }
        
        if (progressLine) {
            progressLine.style.width = progress + '%';
        }
        if (loadingPercent) {
            loadingPercent.textContent = Math.floor(progress) + '%';
        }
    }, intervalTime);
    
    // ========== PORTFOLIO INITIALIZATION (After Preloader) ==========
    function initializePortfolio() {
        
        // Scroll Progress Bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progressPercent = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = progressPercent + '%';
            });
        }
        
        // Animated Numbers Counter
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateNumbers = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const incrementValue = target / 40;
                const updateNumber = () => {
                    if (current < target) {
                        current += incrementValue;
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateNumber();
            });
        };
        
        // Intersection Observer for stats
        const observerOptions = { threshold: 0.3 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) observer.observe(heroStats);
        
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
        const skillsSection = document.querySelector('#skills');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (skillsSection) skillsObserver.observe(skillsSection);
        
        // GSAP Scroll Animations (Lightweight)
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Fade-up animations for glass cards
            const cards = document.querySelectorAll('.glass-card');
            cards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            });
        }
        
        // Smooth scroll for buttons
        const exploreBtn = document.getElementById('exploreBtn');
        const contactBtn = document.getElementById('contactBtn');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // Copy email functionality
        const copyButtons = document.querySelectorAll('.btn-copy');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const email = btn.getAttribute('data-email');
                if (email) {
                    navigator.clipboard.writeText(email);
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Copied!';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                }
            });
        });
        
        // Project buttons (temporary alert)
        const projectBtns = document.querySelectorAll('.btn-project');
        projectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = btn.closest('.project-card');
                const projectName = projectCard?.querySelector('h3')?.innerText || 'this project';
                alert(`📁 "${projectName}" - Full details available. Contact me for the complete case study!`);
            });
        });
        
        // Lightweight parallax for orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        if (orbs.length) {
            window.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                orbs.forEach((orb, index) => {
                    const speed = 15 + index * 8;
                    const x = (mouseX - 0.5) * speed;
                    const y = (mouseY - 0.5) * speed;
                    orb.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                });
            });
        }
        
        // Hover effect for project cards (lightweight)
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0px)';
            });
        });
        
        // Update footer year
        const footer = document.querySelector('footer p');
        if (footer) {
            const year = new Date().getFullYear();
            footer.innerHTML = `© ${year} Farhan Khan | Securing the digital frontier`;
        }
        
        // Console greeting
        console.log('%c🚀 Farhan Khan Portfolio | Fully Loaded', 'color: #00e5ff; font-size: 14px; font-weight: bold;');
        console.log('%c⚡ Optimized | Preloader | Responsive Design', 'color: #8b9bae; font-size: 12px;');
    }
    
    // Fallback: If something goes wrong, show content after 2 seconds
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                if (mainContent) mainContent.style.display = 'block';
                initializePortfolio();
            }, 500);
        }
    }, 2000);
    
})();