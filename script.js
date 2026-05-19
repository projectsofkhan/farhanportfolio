// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // Animated Numbers Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const updateNumber = () => {
                if(current < target) {
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
    
    // Trigger number animation when in viewport
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if(heroStats) observer.observe(heroStats);
    
    // Animate skill bars when scrolled into view
    const skillBars = document.querySelectorAll('.skill-bar');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if(width && !bar.style.animationPlayed) {
                bar.style.animationPlayed = 'true';
                bar.style.setProperty('--skill-width', width + '%');
                const pseudo = window.getComputedStyle(bar, '::after');
                // Direct inline style animation
                setTimeout(() => {
                    bar.classList.add('animate');
                }, 100);
            }
        });
    };
    
    // Add CSS for skill bar animation
    const style = document.createElement('style');
    style.textContent = `
        .skill-bar.animate::after {
            width: var(--skill-width, 0%) !important;
        }
        .skill-bar::after {
            transition: width 1.2s cubic-bezier(0.22, 0.97, 0.36, 1);
        }
    `;
    document.head.appendChild(style);
    
    // Set custom properties for each skill bar
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if(width) {
            bar.style.setProperty('--skill-width', width + '%');
        }
    });
    
    // Trigger skill animation on scroll
    const skillsSection = document.querySelector('#skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                skillBars.forEach(bar => bar.classList.add('animate'));
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if(skillsSection) skillsObserver.observe(skillsSection);
    
    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade-up animations for all glass cards
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -30,
            duration: 0.5
        });
    });
    
    // Navbar active state on scroll
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Explore button scroll
    const exploreBtn = document.getElementById('exploreBtn');
    if(exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Contact button scroll
    const contactBtn = document.getElementById('contactBtn');
    if(contactBtn) {
        contactBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Copy email functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            if(email) {
                navigator.clipboard.writeText(email);
                const originalText = btn.innerHTML;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Copied!';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2000);
            }
        });
    });
    
    // Project buttons alert (temporary)
    const projectBtns = document.querySelectorAll('.btn-project');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectName = btn.closest('.project-card')?.querySelector('h3')?.innerText || 'this project';
            alert(`✨ "${projectName}" - Full case study available upon request. Contact me for details!`);
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
    
    // Hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
    
    // Add floating animation to stat numbers on hover
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            gsap.to(stat.querySelector('.stat-number'), {
                scale: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
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
    console.log('%c🚀 Farhan Khan Portfolio | Cybersecurity Student', 'color: #00e5ff; font-size: 16px; font-weight: bold;');
    console.log('%c⚡ Interactive portfolio loaded | 3D Cards | Scroll Animations', 'color: #8b9bae; font-size: 12px;');
    
    // Dynamic year in footer
    const footer = document.querySelector('footer p');
    if(footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `© ${year} Farhan Khan | Securing the digital frontier`;
    }
    
    // Initialize AOS-like behavior with GSAP for remaining elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .about-card, .contact-card, .project-card');
        elements.forEach((el, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        gsap.fromTo(el, 
                            { opacity: 0, y: 30, scale: 0.95 },
                            { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.1 }
                        );
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(el);
        });
    };
    
    animateOnScroll();
});