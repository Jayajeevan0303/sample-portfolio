document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.skill_bar .progress').forEach(bar => {
        bar.style.setProperty('--target-width', bar.getAttribute('data-target-width'));
    });

    document.querySelectorAll('.progress-circle').forEach(circle => {
        const val = circle.getAttribute('data-progress');
        const ring = circle.querySelector('.progress');
        if (ring) ring.style.strokeDashoffset = 283 - (283 * val) / 100;
    });

    const slider = document.getElementById('project_slides');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => { isDown = false; });
        slider.addEventListener('mouseup',    () => { isDown = false; });

        slider.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x    = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2;   // scroll speed multiplier
            slider.scrollLeft = scrollLeft - walk;
        });

        /* touch support for mobile */
        let touchStartX = 0;
        let touchScrollLeft = 0;
        slider.addEventListener('touchstart', e => {
            touchStartX    = e.touches[0].pageX;
            touchScrollLeft = slider.scrollLeft;
        }, { passive: true });
        slider.addEventListener('touchmove', e => {
            const dx = touchStartX - e.touches[0].pageX;
            slider.scrollLeft = touchScrollLeft + dx;
        }, { passive: true });
    }

});
