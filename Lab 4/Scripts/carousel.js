// handles the carousel logic
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    if (!carousel || typeof carouselSlides === 'undefined') return;
    let current = 0;
    let timer = null;

    function renderSlide(idx) {
        const slide = carouselSlides[idx];
        carousel.innerHTML = `
      <div class="carousel-slide" style="background-image:url('${slide.image}')">
        <a href="${slide.link}" class="carousel-link">${slide.text}</a>
        <button class="carousel-nav left">&lt;</button>
        <button class="carousel-nav right">&gt;</button>
      </div>
    `;
        carousel.querySelector('.carousel-nav.left').onclick = function() {
            current = (current - 1 + carouselSlides.length) % carouselSlides.length;
            renderSlide(current);
            resetTimer();
        };
        carousel.querySelector('.carousel-nav.right').onclick = function() {
            current = (current + 1) % carouselSlides.length;
            renderSlide(current);
            resetTimer();
        };
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            current = (current + 1) % carouselSlides.length;
            renderSlide(current);
        }, 3000);
    }

    renderSlide(current);
    resetTimer();
});

