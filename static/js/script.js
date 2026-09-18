// Enhanced interactions for SnapClass
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal for Feature Cards and Flow Steps
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal styles to elements
    const revealElements = document.querySelectorAll('.feature-card, .flow-step');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Handle CSS for revealed state
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleTag);

    console.log('SnapClass Premium Landing Page Active');

    // ------------------------------------------------------------
    // Mobile hamburger nav — open/close the full-screen overlay menu
    // ------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

    function openNav() {
        mobileNav.classList.add('is-open');
        mobileNavBackdrop.classList.add('is-open');
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        mobileNav.classList.remove('is-open');
        mobileNavBackdrop.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn && mobileNav && mobileNavBackdrop) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.contains('is-open') ? closeNav() : openNav();
        });
        if (mobileNavClose) mobileNavClose.addEventListener('click', closeNav);
        mobileNavBackdrop.addEventListener('click', closeNav);
        mobileNavLinks.forEach(link => link.addEventListener('click', closeNav));

        // Close automatically if the viewport grows back to desktop width
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeNav();
        });
    }
});