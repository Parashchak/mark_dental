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
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
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

    // ========== FADE-IN ANIMATION ON SCROLL ==========
    const fadeElements = document.querySelectorAll(
        '#about, #services, #stats, #team, #reviews, #appointment, #instagram, #contacts'
    );

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // ========== STATS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            if (!target) return;

            let current = 0;
            const increment = target / 60;
            const suffix = stat.textContent.includes('+') ? '+' : '';

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 25);
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate
        const name = contactForm.querySelector('[name="name"]').value.trim();
        const phone = contactForm.querySelector('[name="phone"]').value.trim();

        if (!name || !phone) {
            return;
        }

        // Show success modal
        successModal?.classList.remove('hidden');
        successModal?.classList.add('flex');

        // Reset form
        contactForm.reset();
    });

    closeModal?.addEventListener('click', () => {
        successModal?.classList.add('hidden');
        successModal?.classList.remove('flex');
    });

    // Close modal on outside click
    successModal?.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
        }
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            successModal?.classList.add('hidden');
            successModal?.classList.remove('flex');
        }
    });

    // ========== PHONE FORMAT (optional UX) ==========
    const phoneInput = contactForm?.querySelector('[name="phone"]');
    phoneInput?.addEventListener('input', (e) => {
        // Allow only digits, +, (, ), spaces, dashes
        e.target.value = e.target.value.replace(/[^\d+\-() ]/g, '');
    });

    // ========== SERVICE CARD CLICK → SCROLL TO FORM ==========
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const appointment = document.getElementById('appointment');
            if (appointment) {
                appointment.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

