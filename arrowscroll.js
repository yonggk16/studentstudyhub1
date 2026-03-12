// Arrow click scrolling
document.getElementById('scrollArrow').addEventListener('click', function(e) {
    // Prevent link jumping instantly
    e.preventDefault();
    
    const target = document.getElementById('about');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
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