/**
 * navbar.js — Scroll effects, mobile menu toggle
 */

export function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');

  // Scroll: add 'scrolled' class
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('scrollTop')?.classList.toggle(
      'visible', window.scrollY > 400
    );
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu on link click
  menu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      menu?.classList.remove('open');
      toggle?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}
