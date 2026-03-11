document.addEventListener('DOMContentLoaded', function() {
    // Create button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggle';
    toggleButton.innerHTML = '<span class="toggle-arrow">≫</span>';
    
    const navbar = document.querySelector('.topnavbar');
    
    // Insert toggle button before navbar
    navbar.parentNode.insertBefore(toggleButton, navbar);
    
    // Track navbar state
    let isNavbarVisible = false;
    
    // Function to check screen width and update navbar visibility
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile view (hidden by default)
            toggleButton.style.display = 'flex';
            
            if (!isNavbarVisible) {
                navbar.classList.add('navbar-hidden');
                navbar.classList.remove('navbar-visible');
                toggleButton.classList.remove('toggle-active');
            }
        } else {
            // Desktop view (always show)
            toggleButton.style.display = 'none';
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            isNavbarVisible = false; // Reset state for when returning to mobile
        }
    }
    
    // Toggle navbar visibility on button click
    toggleButton.addEventListener('click', function() {
        isNavbarVisible = !isNavbarVisible;
        
        if (isNavbarVisible) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            toggleButton.classList.add('toggle-active');
        } else {
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
            toggleButton.classList.remove('toggle-active');
        }
    });
    
    // Close navbar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile && isNavbarVisible) {
            // Don't close if clicking a link inside the navbar
            if (event.target.closest('a')) {
                return;
            }
            
            if (!navbar.contains(event.target) && !toggleButton.contains(event.target)) {
                isNavbarVisible = false;
                navbar.classList.add('navbar-hidden');
                navbar.classList.remove('navbar-visible');
                toggleButton.classList.remove('toggle-active');
            }
        }
    });
    
    // Initial check
    handleResize();
    
    // Listens for window resize
    window.addEventListener('resize', handleResize);
});