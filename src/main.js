/**
 * main.js — App bootstrap
 * Initializes router, particles, ticker, navbar, scroll behaviours
 */

import { router } from './router.js';
import { initParticles } from './particles.js';
import { initTicker } from './ticker.js';
import { initNavbar } from './navbar.js';
import { initScrollReveal } from './scrollReveal.js';
import { initScrollTop } from './scrollTop.js';

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTicker();
  initNavbar();
  initScrollTop();

  // Route on hash change
  window.addEventListener('hashchange', () => router.navigate());
  router.navigate(); // initial load

  // Global scroll-reveal observer (re-run after each page render)
  window.addEventListener('page:rendered', initScrollReveal);
  initScrollReveal();
});
