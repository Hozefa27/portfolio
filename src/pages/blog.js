/**
 * blog.js — Chronicle posts loader & Markdown renderer
 */

export async function renderBlog(container) {
  const hash = location.hash; // e.g. #/blog/automation-superpower
  const parts = hash.replace('#/', '').split('/');
  if (parts.length >= 2 && parts[0] === 'blog' && parts[1]) {
    return renderPost(container, parts[1]);
  }
  return renderList(container);
}

async function renderList(container) {
  container.innerHTML = `
    <section class="section" aria-labelledby="blog-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">ESSAYS & TRANSMISSIONS</span>
          <h2 id="blog-heading">Chronicles & Perspectives</h2>
          <div class="section-divider"></div>
          <p>Dispatches on automation architecture, cricket strategy, literature, and artificial intelligence</p>
        </div>
        
        <div class="page-loader" id="blog-loader">
          <div class="spinner"></div>
          <p class="text-muted" style="font-family:var(--font-telemetry);font-size:0.85rem">Decrypting transmissions...</p>
        </div>
        
        <div class="blog-grid stagger-children" id="blog-grid" style="display:none"></div>
      </div>
    </section>
  `;

  try {
    const posts = await loadPosts();
    const loader = document.getElementById('blog-loader');
    const grid   = document.getElementById('blog-grid');

    if (!posts.length) {
      loader.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-feather-pointed"></i>
          <p>No transmissions yet. Add Markdown files to <code>blogs/</code>.</p>
        </div>`;
      return;
    }

    loader.style.display = 'none';
    grid.style.display   = 'grid';
    grid.innerHTML = posts.map(p => buildBlogCard(p)).join('');
    window.dispatchEvent(new Event('page:rendered'));

    grid.addEventListener('click', e => {
      const card = e.target.closest('.blog-card');
      if (card) {
        location.hash = `#/blog/${card.dataset.slug}`;
      }
    });

  } catch (err) {
    document.getElementById('blog-loader').innerHTML = `
      <div class="empty-state">
        <i class="fas fa-circle-exclamation"></i>
        <p>Error retrieving transmissions: ${err.message}</p>
      </div>`;
  }
}

async function renderPost(container, slug) {
  container.innerHTML = `
    <section class="section" aria-label="Transmission detail">
      <div class="container">
        <div class="page-loader" id="post-loader">
          <div class="spinner"></div>
        </div>
        <article class="blog-post-container card" id="post-content" style="display:none;max-width:820px;margin-inline:auto;padding:var(--space-2xl)"></article>
      </div>
    </section>
  `;

  const loader  = document.getElementById('post-loader');
  const article = document.getElementById('post-content');

  try {
    const res = await fetch(`./blogs/${slug}.md`);
    if (!res.ok) throw new Error('File could not be opened');
    const raw = await res.text();
    const { meta, body } = parseFrontmatter(raw);

    loader.style.display = 'none';
    article.style.display = 'block';
    article.innerHTML = `
      <button class="blog-back-btn" onclick="history.back()" aria-label="Back to chronicles">
        <i class="fas fa-arrow-left"></i> RETURN TO ARCHIVE
      </button>
      <div class="blog-post-header reveal" style="margin-bottom:var(--space-xl)">
        ${meta.tags ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${meta.tags.map((t, idx) => `<span class="badge ${idx % 2 === 0 ? 'solar' : ''}">${t}</span>`).join('')}
        </div>` : ''}
        <h1 style="margin-bottom:10px;font-size:clamp(1.8rem, 4vw, 2.5rem);color:var(--starlight-white)">${meta.title || slug}</h1>
        <div class="blog-card-meta" style="font-family:var(--font-telemetry);font-size:0.8rem;color:var(--solar-amber)">
          <span><i class="fas fa-calendar-days"></i> ${formatDate(meta.date)}</span>
        </div>
      </div>
      <div class="blog-post-content reveal" style="transition-delay:80ms;line-height:1.9">
        ${marked.parse(body)}
      </div>
    `;

    window.dispatchEvent(new Event('page:rendered'));
  } catch (err) {
    loader.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-file-circle-xmark"></i>
        <p>Transmission not found.</p>
        <button class="btn btn-outline" onclick="location.hash='#/blog'" style="margin-top:16px">Return to Chronicles</button>
      </div>`;
  }
}

async function loadPosts() {
  const res = await fetch('./blogs/manifest.json');
  if (!res.ok) throw new Error('blogs/manifest.json not found');
  const manifest = await res.json();
  return manifest.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function buildBlogCard(p) {
  return `
    <div class="card blog-card" data-slug="${p.slug}" role="button" tabindex="0"
         aria-label="Read transmission: ${p.title}"
         onkeydown="if(event.key==='Enter')this.click()">
      <div class="card-body">
        <div class="blog-card-meta" style="font-family:var(--font-telemetry);font-size:0.75rem;color:var(--solar-amber);margin-bottom:8px">
          <span><i class="fas fa-calendar-days"></i> ${formatDate(p.date)}</span>
          ${p.readTime ? `<span style="margin-left:12px"><i class="fas fa-clock"></i> ${p.readTime}</span>` : ''}
        </div>
        <h3 class="blog-card-title" style="font-size:1.2rem;margin-bottom:8px">${p.title}</h3>
        <p class="blog-card-excerpt" style="font-size:0.9rem">${p.excerpt || ''}</p>
        ${p.tags ? `
          <div class="blog-card-tags" style="margin-top:12px">
            ${p.tags.map((t, i) => `<span class="badge ${i % 2 === 0 ? 'solar' : ''}">${t}</span>`).join('')}
          </div>` : ''}
        <div class="blog-card-footer" style="margin-top:16px">
          <span class="btn btn-outline btn-sm">Read Transmission <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    </div>
  `;
}

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, body: raw };

  const meta = {};
  fmMatch[1].split('\n').forEach(line => {
    const [key, ...vals] = line.split(':');
    if (!key) return;
    let val = vals.join(':').trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key.trim()] = val.slice(1,-1).split(',').map(v => v.trim().replace(/"/g,''));
    } else {
      meta[key.trim()] = val.replace(/^["']|["']$/g, '');
    }
  });

  return { meta, body: fmMatch[2] };
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch { return dateStr; }
}
