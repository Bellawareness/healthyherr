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
});
