document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-profile-btn');
    const popup = document.getElementById('mobile-profile-popup');

    if (!btn || !popup) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            popup.classList.remove('show');
        }
    });
});