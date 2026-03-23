// Subtle parallax background effect
document.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    // Move background slower than scroll (parallax)
    const offset = Math.round(scrollY * 0.18); // adjust speed here
    document.body.style.setProperty('--bg-parallax-offset', offset + 'px');
    const before = document.body;
    if (before) {
        // This is for the ::before pseudo-element, so we use CSS var
        before.style.setProperty('--bg-parallax-offset', offset + 'px');
    }
});
// Micro Checklist Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Checklist scroll-in animation
    const checklistItems = document.querySelectorAll('.micro-checklist-item');
    if (checklistItems.length > 0) {
        function revealChecklistOnScroll() {
            const section = document.querySelector('.micro-checklist-section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 120) {
                checklistItems.forEach((item, idx) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, idx * 350);
                });
                window.removeEventListener('scroll', revealChecklistOnScroll);
            }
        }
        window.addEventListener('scroll', revealChecklistOnScroll);
        revealChecklistOnScroll();
    }

    // Checklist interactivity
    const checklist = document.getElementById('microChecklist');
    const result = document.getElementById('microChecklistResult');
    const award = document.getElementById('microChecklistAward');
    if (checklist) {
        function updateChecklistResult() {
            const checks = checklist.querySelectorAll('.micro-check');
            const checked = checklist.querySelectorAll('.micro-check:checked');
            if (checked.length === 0) {
                result.style.display = 'block';
                result.textContent = 'Start by checking something you did!';
                award.style.display = 'none';
            } else if (checked.length < checks.length) {
                result.style.display = 'block';
                result.textContent = `You checked ${checked.length} of ${checks.length}. Keep going!`;
                award.style.display = 'none';
            } else {
                result.style.display = 'none';
                award.style.display = 'flex';
            }
        }
        checklist.addEventListener('change', updateChecklistResult);
        updateChecklistResult();
    }
});
// Simple JS for Healthyherr.com

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Notify Me button interactivity
    const notifyBtn = document.querySelector('.notify-btn');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', function() {
            alert('Thank you! You will be notified when we launch.');
        });
    }

    // Slideshow functionality with subtle navigation and full image display
    let slideIndex = 1;
    function showSlides(n) {
        const slides = document.getElementsByClassName('slide');
        if (slides.length === 0) return;
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slides[slideIndex-1].style.display = 'block';
        updateDots();
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    function updateDots() {
        const dots = document.getElementsByClassName('slideshow-dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '');
        }
        if (dots[slideIndex-1]) dots[slideIndex-1].className += ' active';
    }
    showSlides(slideIndex);

    // Spin Class Photo Slider
    initSpinClassSliders();
});

function initSpinClassSliders() {
    const sliders = document.querySelectorAll('[data-slider-id]');
    sliders.forEach(slider => {
        const sliderId = slider.getAttribute('data-slider-id');
        const slides = slider.querySelectorAll('.spin-slide');
        const dots = slider.querySelectorAll('.spinclass-dot');
        const prevBtn = slider.querySelector('.spin-prev');
        const nextBtn = slider.querySelector('.spin-next');

        if (slides.length === 0) return;

        let currentSlideIndex = 0;

        function showSlide(n) {
            slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === n);
            });
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === n);
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = idx;
                showSlide(currentSlideIndex);
            });
        });

        showSlide(0);
    });
}

// Confetti and score-based rewards
const scoreMessages = {
    0: {
        title: "Starting Your Journey",
        message: "Your wellness story begins whenever you're ready. Take your first step today!"
    },
    1: {
        title: "Great Start! 1/4",
        message: "You've taken the first step! Every small act of self-care matters. Keep going!"
    },
    2: {
        title: "You're Doing Well! 2/4",
        message: "You're halfway there! You're showing up for yourself, and that's beautiful."
    },
    3: {
        title: "Almost Perfect! 3/4",
        message: "You're so close! One more step and you'll have a complete self-care day."
    },
    4: {
        title: "Perfect Self-Care Day! 🌟 4/4",
        message: "Amazing! You've nailed self-care today. You deserve to celebrate yourself!"
    }
};

function celebrateBeginning(event) {
    event.preventDefault();
    
    // Calculate score based on checklist
    const checklist = document.getElementById('microChecklist');
    const checked = checklist.querySelectorAll('.micro-check:checked').length;
    
    // Get appropriate message for score
    const scoreData = scoreMessages[checked];
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Create reward message
    quoteDisplay.innerHTML = `<div class="reward-message"><div class="reward-title">${scoreData.title}</div><div class="reward-text">"${scoreData.message}"</div></div>`;
    quoteDisplay.style.animation = 'none';
    setTimeout(() => {
        quoteDisplay.style.animation = 'fadeInUp 0.6s ease-out';
    }, 10);
    
    // Create confetti
    createConfetti();
}

function createConfetti() {
    const colors = ['#ACDBD1', '#9E41B4', '#FBF5BF', '#E5CEE2', '#2e8b57'];
    const confettiPieces = 50;
    
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 2 + 2; // 2-4 seconds
        const xOffset = (Math.random() - 0.5) * 200; // -100 to 100px
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) translateX(${xOffset}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
