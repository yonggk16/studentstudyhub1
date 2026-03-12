// Back to Top Button Logic
document.addEventListener('DOMContentLoaded', () => {
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