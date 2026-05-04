// handles the carousel logic
$(function() {
    var $carousel = $('#carousel');
    if ($carousel.length === 0 || typeof carouselSlides === 'undefined') return;

    var current = 0;
    var timer = null;

    function renderSlide(idx) {
        const slide = carouselSlides[idx];
        $carousel.html(`
            <div class="carousel-slide" style="background-image:url('${slide.image}')">
                <a href="${slide.link}" class="carousel-link">${slide.text}</a>
                <button class="carousel-nav left">&lt;</button>
                <button class="carousel-nav right">&gt;</button>
            </div>
        `);

        $carousel.find('.carousel-nav.left').on('click',function() {
            current = (current - 1 + carouselSlides.length) % carouselSlides.length;
            renderSlide(current);
            resetTimer();
        });
        $carousel.find('.carousel-nav.right').on('click',function() {
            current = (current + 1) % carouselSlides.length;
            renderSlide(current);
            resetTimer();
        });
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
