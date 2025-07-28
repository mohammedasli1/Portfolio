// Enhanced Galaxy Background Effects
function createEnhancedGalaxyEffects() {
    const galaxyContainer = document.querySelector('.galaxy-container');
    
    // Create additional shooting stars
    for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star-extra';
        shootingStar.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, rgba(0, 212, 255, 1), transparent);
            border-radius: 50%;
            box-shadow: 0 0 6px 2px rgba(0, 212, 255, 0.8);
            animation: shooting-star-extra ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        galaxyContainer.appendChild(shootingStar);
    }
    
    // Add CSS for extra shooting stars
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shooting-star-extra {
            0% {
                transform: translateX(-50px) translateY(-50px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateX(800px) translateY(800px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Enhanced Parallax effect for planet
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const planet = document.querySelector('.planet');
    const planetRings = document.querySelector('.planet-rings');
    
    if (planet) {
        planet.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
    }
    
    if (planetRings) {
        planetRings.style.transform = `translate(-50%, -50%) rotateX(75deg) rotateZ(${scrolled * 0.1}deg)`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special handling for skill items
            if (entry.target.classList.contains('skill-card')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-card, .education-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enhanced Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        setTimeout(() => {
            typeWriter(roleElement, originalText, 150);
        }, 2000);
    }
});

// Enhanced Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.4)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

document.querySelector('.download-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 1. Create ripple effect (keep your existing animation)
    createRippleEffect(this, e);
    
    // 2. Add pulse effect
    this.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        this.style.animation = '';
    }, 600);
    
    // 3. ACTUAL DOWNLOAD SOLUTION (NEW CODE)
    const fileId = '16w2eyBkA0M7JPUIPRdxrfaPg70Takh8s';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Method 1: Direct download (works in most cases)
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'Your_Name_CV.pdf');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Method 2: Fallback if Method 1 fails (opens in new tab)
    setTimeout(() => {
        if(!document.querySelector('iframe[src*="drive.google.com"]')) {
            window.open(downloadUrl, '_blank');
        }
    }, 1000);
});

// Enhanced Skill items click effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('click', function(e) {
        createRippleEffect(this, e);
        
        const skillName = this.querySelector('span').textContent;
        showNotification(`You clicked on ${skillName}!`, 'success');
        
        // Add glow effect
        this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 1000);
    });

    // Make skill items focusable for keyboard navigation
    item.setAttribute('tabindex', '0');
    
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Enhanced Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Ripple Effect Function
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Enhanced ripple styles
    if (!document.querySelector('#enhanced-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'enhanced-ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(153, 69, 255, 0.4) 50%, transparent 100%);
                transform: scale(0);
                animation: enhanced-ripple-animation 0.8s linear;
                pointer-events: none;
            }
            
            @keyframes enhanced-ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                50% {
                    transform: scale(2);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: 'linear-gradient(135deg, #00d4ff, #9945ff)',
        error: 'linear-gradient(135deg, #ff006e, #ff4081)',
        info: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
        font-weight: 500;
        max-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section, main');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -80px 0px'
});

sections.forEach(section => {
    if (section.id) {
        navObserver.observe(section);
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    const skillItems = document.querySelectorAll('.skill-item');
    const focusedElement = document.activeElement;
    const currentIndex = Array.from(skillItems).indexOf(focusedElement);
    
    if (currentIndex !== -1) {
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % skillItems.length;
                skillItems[nextIndex].focus();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + skillItems.length) % skillItems.length;
                skillItems[prevIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const downIndex = Math.min(currentIndex + 2, skillItems.length - 1);
                skillItems[downIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const upIndex = Math.max(currentIndex - 2, 0);
                skillItems[upIndex].focus();
                break;
        }
    }
});

// Initialize enhanced galaxy effects
document.addEventListener('DOMContentLoaded', () => {
    createEnhancedGalaxyEffects();
    
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.hero-text > *');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    console.log('Enhanced Galaxy Portfolio loaded successfully!');
});

// Performance optimization
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Throttled scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar and parallax effects are already handled above
}, 16));

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}