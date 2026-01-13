/**
 * LIRON ACHDUT - Personal Portfolio
 * CRAZY FUN Interactions
 */

(function() {
    'use strict';

    // ========================================
    // SCROLL REVEAL
    // ========================================

    const revealElements = document.querySelectorAll('.about-label, .about-bio, .contact-header, .social-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
        revealObserver.observe(el);
    });

    // ========================================
    // SMOOTH SCROLL
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========================================
    // MAGNETIC EFFECT ON SOCIAL LINKS
    // ========================================

    const socialItems = document.querySelectorAll('.social-item');

    socialItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            item.style.transform = `scale(1.02) translate(${x * 0.05}px, ${y * 0.05}px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // ========================================
    // PARALLAX ON HERO BLOBS
    // ========================================

    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 30;
                const y = (e.clientY / window.innerHeight - 0.5) * 30;

                document.documentElement.style.setProperty('--mouse-x', `${x}px`);
                document.documentElement.style.setProperty('--mouse-y', `${y}px`);

                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // RANDOM CONFETTI ON CLICK (FUN!)
    // ========================================

    document.addEventListener('click', (e) => {
        // Only trigger on certain elements
        if (!e.target.closest('.social-item, .name-line')) return;

        for (let i = 0; i < 8; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${['#FF2D92', '#A855F7', '#00D4FF', '#FACC15'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${x}px;
            top: ${y}px;
        `;

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let posX = 0;
        let posY = 0;
        let opacity = 1;

        function animate() {
            posX += vx * 0.02;
            posY += vy * 0.02 + 2; // gravity
            opacity -= 0.02;

            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animate);
    }

    // ========================================
    // TEXT SCRAMBLE ON HOVER (NAME)
    // ========================================

    const nameLines = document.querySelectorAll('.name-line');

    nameLines.forEach(line => {
        const originalText = line.textContent;

        line.addEventListener('mouseenter', () => {
            scrambleText(line, originalText);
        });
    });

    function scrambleText(element, finalText) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
        let iteration = 0;

        const interval = setInterval(() => {
            element.textContent = finalText
                .split('')
                .map((char, i) => {
                    if (i < iteration) return finalText[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= finalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2;
        }, 30);
    }

})();
