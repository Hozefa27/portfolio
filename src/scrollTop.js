/**
 * scrollTop.js — Scroll-to-top button behaviour
 */

export function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
