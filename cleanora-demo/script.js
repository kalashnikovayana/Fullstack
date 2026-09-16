const body = document.body;
const switcher = document.querySelector('.version-switch');
const variants = document.querySelectorAll('[data-bad][data-good]');
const dialog = document.querySelector('#booking');
const service = document.querySelector('#service');
const allServicesLink = document.querySelector('.all-services-link');
const allServices = document.querySelector('#all-services');
allServicesLink.addEventListener('click', event => {
  event.preventDefault();
  allServices.hidden = !allServices.hidden;
  allServicesLink.setAttribute('aria-expanded', String(!allServices.hidden));
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeMotion = new Set();
function motion(element, frames, options) {
  if (reducedMotion.matches || !element.animate) return;
  // Replace unfinished motion during rapid toggling rather than stacking effects.
  element.getAnimations().forEach(animation => animation.cancel());
  const animation = element.animate(frames, options);
  activeMotion.add(animation);
  animation.finished.catch(() => {}).finally(() => activeMotion.delete(animation));
}
function setVersion(good) {
  if (!good) {
    allServices.hidden = true;
    allServicesLink.setAttribute('aria-expanded', 'false');
  }
  body.classList.toggle('good-version', good);
  body.classList.toggle('red-version', !good);
  switcher.setAttribute('aria-pressed', String(good));
  switcher.setAttribute('aria-label', good ? 'Увімкнути UX-помилки' : 'Увімкнути хорошу версію');
  variants.forEach(element => {
    element.textContent = good ? element.dataset.good : element.dataset.bad;
    if (element.dataset.goodHref) element.href = good ? element.dataset.goodHref : element.dataset.badHref;
  });
}
switcher.addEventListener('click', () => {
  setVersion(!body.classList.contains('good-version'));
  // Content changes immediately; only visible text gets a brief visual transition.
  variants.forEach(element => {
    const bounds = element.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < innerHeight) {
      motion(element, [{ opacity: .35, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }],
        { duration: 240, easing: 'ease-out' });
    }
  });
});
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { service.value = link.dataset.service; }));
document.querySelector('.booking-action').addEventListener('click', () => {
  dialog.showModal();
  motion(dialog, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
    { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)' });
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
document.querySelector('#estimate').addEventListener('submit', event => {
  event.preventDefault();
  const area = Number(document.querySelector('#area').value);
  const base = { regular: 3600, deep: 6000, move: 7600 }[service.value];
  const price = Math.ceil(base * Math.max(1, area / 50) / 100) * 100;
  document.querySelector('#estimate-result').textContent = 'Орієнтир: від ' + price.toLocaleString('uk-UA') + ' грн. Стан помешкання та додаткові роботи можуть змінити суму. Це приклад для демосайту.';
});

// Clip photo motion to its own frame, preserving the existing image ratios.
document.querySelectorAll('main img').forEach(img => {
  const frame = document.createElement('div');
  frame.className = 'photo-window';
  img.before(frame);
  frame.append(img);
});

// Progressive enhancement: nothing is hidden while waiting for JavaScript or scrolling.
const revealTargets = document.querySelectorAll('.hero-intro, .hero-photo, .section-heading, .service-feature, .service-text, .service-move, .pricing-grid, .trust-grid, .contact');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      motion(entry.target, [
        { opacity: .25, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  revealTargets.forEach(element => observer.observe(element));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) activeMotion.forEach(animation => animation.cancel());
});
