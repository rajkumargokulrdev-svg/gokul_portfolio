// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Background on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // Hero Animations
    const tl = gsap.timeline();

    tl.from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
        .from(".hero-content .fade-in-up", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5")
        .from(".hero-visual", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=1");

    // Scroll Animations (General Fade Up)
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Reveal Left
    gsap.utils.toArray('.reveal-left').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Reveal Right
    gsap.utils.toArray('.reveal-right').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Progress Bar Animation
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0'; // Reset before animating

        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
            },
            width: width,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Code Badge Float Animation (Micro-interaction)
    // Already handled by CSS keyframes, but interactive hover could be added here
    const badges = document.querySelectorAll('.code-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            gsap.to(badge, { scale: 1.1, duration: 0.3 });
        });
        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, { scale: 1, duration: 0.3 });
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
