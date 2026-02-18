// Portfolio Website - Interactive Features
// Somayeh Yarahmadi

document.addEventListener('DOMContentLoaded', function() {
    // Email obfuscation
    obfuscateEmails();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Add scroll animations
    initScrollAnimations();

    // Mobile navigation
    initMobileNav();
});

// Email obfuscation to prevent spam bots from scraping
function obfuscateEmails() {
    const emailLinks = document.querySelectorAll('a[data-user][data-domain]');
    emailLinks.forEach(link => {
        const user = link.getAttribute('data-user');
        const domain = link.getAttribute('data-domain');
        if (user && domain) {
            const email = user + '@' + domain;
            link.href = 'mailto:' + email;
            // Set display text if it's a text-only link (not an icon link)
            const hasSvg = link.querySelector('svg');
            if (!hasSvg) {
                link.textContent = email;
            }
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll animations for timeline and cards
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe publication items
    const publicationItems = document.querySelectorAll('.publication-item');
    publicationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(item);
    });
}

// Mobile navigation toggle
function initMobileNav() {
    // Add mobile menu button if needed
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768) {
        // Create hamburger menu button
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = 'background: none; border: none; font-size: 1.5rem; color: var(--primary-blue); cursor: pointer; display: none;';

        // Add to nav
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !document.querySelector('.mobile-menu-btn')) {
            navContainer.appendChild(menuBtn);

            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                menuBtn.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
            });
        }
    }
}

// Add active nav link highlighting based on current page
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
updateActiveNavLink();

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll-to-top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--accent-amber);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Print optimization
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections if any
    document.querySelectorAll('.collapsed').forEach(el => {
        el.classList.remove('collapsed');
    });
});

// Performance: Remove animations on reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Analytics placeholder (add your analytics code here)
function trackPageView() {
    // Add Google Analytics or other tracking here
    console.log('Page view tracked:', window.location.pathname);
}

trackPageView();
