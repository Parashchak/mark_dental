// ========== MARK Dental Clinic — JavaScript ==========

document.addEventListener('DOMContentLoaded', () => {
    // ========== MOBILE MENU ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpen = mobileMenuBtn?.querySelector('.menu-open');
    const menuClose = mobileMenuBtn?.querySelector('.menu-close');

    mobileMenuBtn?.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuOpen?.classList.toggle('hidden');
        menuClose?.classList.toggle('hidden');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close mobile menu when clicking a link
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuOpen?.classList.remove('hidden');
            menuClose?.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 40) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }
    });

    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

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
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== FADE-IN ANIMATION ON SCROLL ==========
    const fadeElements = document.querySelectorAll(
        '#about, #services, #why-us, #instagram, #contacts'
    );

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ========== SERVICE CARD INTERACTION ==========
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const contacts = document.getElementById('contacts');
            if (contacts) {
                contacts.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
