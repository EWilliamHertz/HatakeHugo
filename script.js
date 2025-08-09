// Simple fade-in on scroll
const faders = document.querySelectorAll('section');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMobileMenuButton = document.getElementById('close-mobile-menu');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');

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
    mobileMenu.classList.add('open');
});

closeMobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

// Contact Form Validation
contactForm.addEventListener('submit', function (e) {
    let errors = false;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset errors
    [name, email, message].forEach(input => {
        input.classList.remove('error');
        input.nextElementSibling.textContent = '';
    });

    if (name.value.trim() === '') {
        errors = true;
        name.classList.add('error');
        name.nextElementSibling.textContent = 'Name is required.';
    }

    if (email.value.trim() === '') {
        errors = true;
        email.classList.add('error');
        email.nextElementSibling.textContent = 'Email is required.';
    } else if (!isValidEmail(email.value.trim())) {
        errors = true;
        email.classList.add('error');
        email.nextElementSibling.textContent = 'Please enter a valid email address.';
    }

    if (message.value.trim() === '') {
        errors = true;
        message.classList.add('error');
        message.nextElementSibling.textContent = 'Message is required.';
    }

    if (errors) {
        e.preventDefault();
    }
});

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
