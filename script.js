// Mobile Menu Toggle with smooth animations
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
let isMenuOpen = false;

function toggleMobileMenu() {
    if (!isMenuOpen) {
        // Open menu
        navOverlay.classList.add('active');
        navLinks.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
        
        // Animate menu items
        const menuItems = document.querySelectorAll('.nav-links li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        });
    } else {
        // Close menu
        navOverlay.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        isMenuOpen = false;
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking overlay
navOverlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// Set current year in copyright
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Simple form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // In a real implementation, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you ${name}! Your message has been sent successfully. I will contact you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('about')) {
                const skillLevels = entry.target.querySelectorAll('.skill-level');
                skillLevels.forEach(level => {
                    const width = level.style.width;
                    level.style.width = '0';
                    
                    setTimeout(() => {
                        level.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                        level.style.width = width;
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Go to Top Button
const goToTopBtn = document.getElementById('goToTop');

function updateGoToTopButton() {
    if (window.scrollY > 500) {
        goToTopBtn.classList.add('active');
    } else {
        goToTopBtn.classList.remove('active');
    }
}

goToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', updateGoToTopButton);
updateGoToTopButton(); // Initial check

// Add smooth hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px)';
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    }
    
    // Preload animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 300);
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    }, 250);
});

// Add LinkedIn button animation
const linkedinBtn = document.querySelector('.linkedin-request-btn');
if (linkedinBtn) {
    linkedinBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    linkedinBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    linkedinBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    linkedinBtn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
    });
}

// Prevent text selection except for selectable elements
document.addEventListener('selectstart', function(e) {
    if (!e.target.classList.contains('selectable-text') && 
        !e.target.tagName === 'INPUT' && 
        !e.target.tagName === 'TEXTAREA') {
        e.preventDefault();
    }
});

// Smooth section transitions
function animateSection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

const sectionObserver = new IntersectionObserver(animateSection, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add hover effect to project card
const projectCard = document.querySelector('.project-card');
if (projectCard) {
    projectCard.addEventListener('mouseenter', () => {
        projectCard.style.transform = 'translateY(-10px)';
    });
    
    projectCard.addEventListener('mouseleave', () => {
        projectCard.style.transform = 'translateY(0)';
    });
}

// Email copy functionality
const emailElement = document.querySelector('.contact-item:nth-child(2) p.selectable-text');
if (emailElement) {
    emailElement.addEventListener('click', function() {
        const email = this.textContent;
        navigator.clipboard.writeText(email).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied to clipboard!';
            this.style.color = '#4a6cf7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 2000);
        });
    });
    
    emailElement.style.cursor = 'pointer';
    emailElement.title = 'Click to copy email';
}