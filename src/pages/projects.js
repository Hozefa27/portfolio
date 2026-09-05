/**
 * projects.js — Dynamically loads all project definitions from /projects/manifest.json
 */

const CATEGORY_COLORS = {
  'AI/ML':         'plasma',
  'Data Science':  'solar',
  'Python':        'starlight',
  'Automation':    'cyan',
  'All':           '',
};

const PROJECT_ICONS = {
  'AI/ML':        '🤖',
  'Data Science': '📊',
  'Python':       '🐍',
  'Automation':   '⚙️',
  'Research':     '🔬',
};

export async function renderProjects(container) {
  container.innerHTML = `
    <section class="section" aria-labelledby="projects-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">INVENTIONS & REPOSITORIES</span>
          <h2 id="projects-heading">Engineered Systems</h2>
          <div class="section-divider"></div>
          <p>Production pipelines, automated tools, and predictive models built with code</p>
        </div>
        
        <div class="page-loader" id="projects-loader">
          <div class="spinner"></div>
          <p class="text-muted" style="font-family:var(--font-telemetry);font-size:0.85rem">Scanning project manifests...</p>
        </div>

        <div id="projects-content" style="display:none">
          <div class="filter-tabs" id="filter-tabs"></div>
          <div class="project-grid stagger-children" id="project-grid"></div>
        </div>
      </div>
    </section>
  `;

  try {
    const projects = await loadProjects();
    renderProjectContent(projects);
  } catch (err) {
    document.getElementById('projects-loader').innerHTML = `
      <div class="empty-state">
        <i class="fas fa-folder-open"></i>
        <p>Could not load projects. Verify <code>projects/manifest.json</code> is accessible.</p>
        <p class="text-muted" style="font-size:0.8rem;margin-top:8px">${err.message}</p>
      </div>`;
  }
}

async function loadProjects() {
  const manifestRes = await fetch('./projects/manifest.json');
  if (!manifestRes.ok) throw new Error('manifest.json missing in ./projects/');
  const manifest = await manifestRes.json();

  const results = await Promise.allSettled(
    manifest.map(file => fetch(`./projects/${file}`).then(r => r.json()))
  );

  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.date || '').localeCompare(a.date || '');
    });
}

function renderProjectContent(projects) {
  const loader  = document.getElementById('projects-loader');
  const content = document.getElementById('projects-content');
  const tabsEl  = document.getElementById('filter-tabs');
  const gridEl  = document.getElementById('project-grid');

  if (!projects.length) {
    loader.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-folder-open"></i>
        <p>No project definitions found. Add JSON files to <code>projects/</code>.</p>
      </div>`;
    return;
  }

  loader.style.display = 'none';
  content.style.display = 'block';

  // Build filter tabs
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  tabsEl.innerHTML = categories.map(cat =>
    `<button class="filter-tab${cat === 'All' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  const renderGrid = (filter) => {
    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);
    gridEl.innerHTML = filtered.map(p => buildProjectCard(p)).join('');
    window.dispatchEvent(new Event('page:rendered'));
  };

  renderGrid('All');

  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.cat);
  });
}

function buildProjectCard(p) {
  const icon = PROJECT_ICONS[p.category] || '💡';
  const badgeClass = CATEGORY_COLORS[p.category] || '';
  const status = p.status === 'wip'
    ? `<span class="project-status wip">In Orbit</span>`
    : `<span class="project-status completed">Operational</span>`;

  const githubLink = p.github
    ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository"><i class="fab fa-github"></i></a>`
    : '';
  const demoLink = p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><i class="fas fa-arrow-up-right-from-square"></i></a>`
    : '';

  return `
    <div class="card project-card">
      ${p.featured ? '<div class="project-featured-badge">★ MISSION CRITICAL</div>' : ''}
      <div class="card-body">
        ${status}
        <div class="project-card-header">
          <span class="project-icon">${icon}</span>
          <div class="project-links">${githubLink}${demoLink}</div>
        </div>
        <div class="project-title">${p.title}</div>
        <div class="project-tagline">${p.tagline || ''}</div>
        <p class="project-desc">${p.description || ''}</p>
        <div class="project-tech">
          <span class="badge ${badgeClass}">${p.category}</span>
          ${(p.tech || []).slice(0, 5).map((t, idx) => `<span class="badge ${idx % 2 === 0 ? 'starlight' : ''}">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}
