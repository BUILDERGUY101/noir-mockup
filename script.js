document.addEventListener("DOMContentLoaded", function() {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.container');
    const percentageElement = document.querySelector('.loader-percentage');
    
    window.onload = function() {
        if (percentageElement) {
            let progress = 0;
            // The total duration of the loading animation in milliseconds
            const loadingDuration = 1800;
            // Calculate interval time to complete in the desired duration
            const intervalTime = loadingDuration / 100;

            const progressInterval = setInterval(() => {
                progress++;
                if (progress <= 100) {
                    percentageElement.textContent = `${progress}%`;
                } else {
                    clearInterval(progressInterval);
                }
            }, intervalTime);
        }

        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('loaded');
            }
            if (mainContainer) {
                mainContainer.classList.add('visible');
            }
            animateHeroText();
        }, 2000); 
    };

    // --- SMOOTH SCROLL FOR ALL NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- HERO TEXT ANIMATION ---
    function animateHeroText() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
                // span.style.display = 'inline-block'; // This line is not needed with the current CSS
                heroTitle.appendChild(span);
            });

            gsap.to('.hero-title .char', {
                y: 0,
                stagger: 0.05,
                delay: 0.2,
                duration: 1,
                ease: 'expo.out'
            });
        }
    }

    // --- SCROLL ANIMATIONS ---
    const animatedItems = document.querySelectorAll('.anim-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // THE TYPO WAS HERE! Corrected to 'isIntersecting'
            if (entry.isIntersecting) { 
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedItems.forEach(item => {
        observer.observe(item);
    });
});