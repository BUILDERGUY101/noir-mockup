document.addEventListener("DOMContentLoaded", function() {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.container');
    const percentageElement = document.querySelector('.loader-percentage');
    const progressCircle = document.querySelector('.loader-circle-progress');
    
    window.onload = function() {
        if (percentageElement && progressCircle) {
            const circumference = progressCircle.getTotalLength();
            let counter = { value: 0 };
            
            gsap.to(counter, {
                value: 100,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    const progress = Math.round(counter.value);
                    percentageElement.textContent = `${progress}%`;
                    const offset = circumference - (progress / 100) * circumference;
                    progressCircle.style.strokeDashoffset = offset;
                }
            });
        }

        setTimeout(() => {
            if (preloader) preloader.classList.add('loaded');
            if (mainContainer) mainContainer.classList.add('visible');
            animateHeroText();
        }, 1200); 
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
                span.textContent = char === ' ' ? '\u00A0' : char;
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

    // --- RE-TRIGGERING SCROLL ANIMATIONS ---
    const animatedItems = document.querySelectorAll('.anim-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animatedItems.forEach(item => observer.observe(item));

    // --- DYNAMIC SCROLL-FOLLOWING ANIMATION ---
    let webglSphere;
    const sections = document.querySelectorAll('.hero, .features, .pricing, #about, #faq');

    document.addEventListener('webglSphereCreated', (event) => {
        webglSphere = event.detail.sphere;
        
        window.addEventListener('scroll', () => {
            if (!webglSphere) return;
            
            let closestSection = sections[0];
            let minDistance = Infinity;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top - (window.innerHeight / 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });

            const targetY = (closestSection.offsetTop - window.scrollY) / 100 - 2;

            gsap.to(webglSphere.position, {
                y: -targetY,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    });

    // ------------------------------------
    // --- FAQ ACCORDION FUNCTIONALITY ---
    // ------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Toggle the 'active' class on the question to rotate the '+' symbol
            question.classList.toggle('active');

            // Check if the answer is currently visible
            if (answer.style.maxHeight) {
                // If it is, collapse it by setting maxHeight to null
                answer.style.maxHeight = null;
            } else {
                // If it's not, set maxHeight to its scrollHeight, which makes it visible
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

});
