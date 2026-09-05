/**
 * scrollReveal.js — Intersection Observer for scroll animations
 */

export function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .stagger-children'
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Skill bars
          entry.target.querySelectorAll?.('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}
