// Simple fade-in on scroll
const faders = document.querySelectorAll('section');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navLinks = document.getElementById('nav-links');

const appearOptions = {
    threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    fader.style.opacity = 0;
    fader.style.transform = "translateY(20px)";
    fader.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    appearOnScroll.observe(fader);
});

mobileMenuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
