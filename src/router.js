/**
 * router.js — Hash-based SPA router
 */

import { renderHome }    from './pages/home.js';
import { renderResume }  from './pages/resume.js';
import { renderProjects} from './pages/projects.js';
import { renderBlog }    from './pages/blog.js';
import { renderContact } from './pages/contact.js';

const routes = {
  '':         renderHome,
  'home':     renderHome,
  'resume':   renderResume,
  'projects': renderProjects,
  'blog':     renderBlog,
  'contact':  renderContact,
};

export const router = {
  navigate() {
    const hash   = location.hash.replace('#/', '').split('/')[0].toLowerCase();
    const page   = routes[hash] || renderHome;
    const main   = document.getElementById('main-content');

    // Active nav link
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.page === (hash || 'home'));
    });

    // Render with fade transition
    main.style.opacity = '0';
    main.style.transform = 'translateY(8px)';

    setTimeout(async () => {
      await page(main);
      main.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      main.style.opacity = '1';
      main.style.transform = 'translateY(0)';

      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Notify animations
      window.dispatchEvent(new Event('page:rendered'));
    }, 120);
  },

  // Navigate programmatically
  go(path) {
    location.hash = `#/${path}`;
  }
};
