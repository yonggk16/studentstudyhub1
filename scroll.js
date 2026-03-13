// Back to Top Button Logic
document.addEventListener('DOMContentLoaded', () => {
    // Arrow click scrolling
    const getStartedBtn = document.querySelector('.get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            // Prevent link jumping instantly
            e.preventDefault();
            
            const target = document.getElementById('about');
            if (!target) return;
            
            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Duration in ms
            let start = null;

            // Anim function
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Smooth scrolling
                const line = linear(progress);
                
                window.scrollTo(0, startPosition + distance * line);
                
                // If anim elapse time is lesser than duration, run
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function linear(t) {
                return t;
            }
            requestAnimationFrame(animation);
        });
    }

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '▲';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
});