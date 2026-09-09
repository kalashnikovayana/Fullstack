// Mobile navigation toggle
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menuButton.setAttribute('aria-expanded', 'false');
            mobileMenu.hidden = true;
        });
    });
}

// Testimonial carousel
const track = document.querySelector('[data-testimonial-track]');

if (track) {
    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const dotsWrap = document.querySelector('[data-testimonial-dots]');
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.testimonial-dot')) : [];
    let index = 0;

    const render = () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
    };

    const go = (nextIndex) => {
        index = (nextIndex + slides.length) % slides.length;
        render();
    };

    document.querySelector('[data-testimonial-prev]')?.addEventListener('click', () => go(index - 1));
    document.querySelector('[data-testimonial-next]')?.addEventListener('click', () => go(index + 1));

    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

    render();
}

// Contact form — explain what happens next instead of a bare "thank you"
const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = contactForm.querySelector('#name');
        const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';

        const message = document.createElement('div');
        message.setAttribute('role', 'status');
        message.className = 'space-y-3';
        message.innerHTML = `
            <p class="text-2xl font-medium tracking-tight">
                ${name ? `Дякуємо, ${name}!` : 'Дякуємо за заявку!'}
            </p>
            <p class="text-slate-600 leading-relaxed">
                Передзвонимо сьогодні до 18:00, щоб уточнити деталі й погодити час виїзду на розрахунок.
            </p>
        `;

        contactForm.replaceWith(message);
    });
}
