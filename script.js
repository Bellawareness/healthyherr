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
