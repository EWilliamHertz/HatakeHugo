document.addEventListener('DOMContentLoaded', () => {
    // --- Fade-in on Scroll ---
    const faders = document.querySelectorAll('section');
    const appearOptions = { threshold: 0.1 };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in-section');
        appearOnScroll.observe(fader);
    });

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-content a');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside the content area
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('open');
        }
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let errors = false;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const inputs = [name, email, message];

            // Reset previous errors
            inputs.forEach(input => {
                input.classList.remove('error');
                const errorMessageSpan = input.parentElement.querySelector('.error-message');
                if(errorMessageSpan) errorMessageSpan.textContent = '';
            });

            // Check Name
            if (name.value.trim() === '') {
                errors = true;
                setError(name, 'Name is required.');
            }

            // Check Email
            if (email.value.trim() === '') {
                errors = true;
                setError(email, 'Email is required.');
            } else if (!isValidEmail(email.value.trim())) {
                errors = true;
                setError(email, 'Please enter a valid email address.');
            }

            // Check Message
            if (message.value.trim() === '') {
                errors = true;
                setError(message, 'Message is required.');
            }

            if (errors) {
                e.preventDefault(); // Prevent form submission if there are errors
            }
        });
    }

    function setError(inputElement, message) {
        inputElement.classList.add('error');
        const errorMessageSpan = inputElement.parentElement.querySelector('.error-message');
        if (errorMessageSpan) {
            errorMessageSpan.textContent = message;
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
