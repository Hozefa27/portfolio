/**
 * home.js — Cosmic Hero, Interactive Photo Switcher, Telemetry Stats, Skills, and Timeline
 */

const ROLES = [
  'Python Developer & Architect 🐍',
  'AI/ML Systems Engineer 🤖',
  'Data Science & Analytics 📊',
  'Automation Architect ⚙️',
  'Cricket Strategist & Writer 🏏'
];

export async function renderHome(container) {
  container.innerHTML = buildHome();
  initTyping();
  initPhotoSwitcher();
  await loadTimeline();
}

function buildHome() {
  return `
    <!-- ========== CELESTIAL HERO ========== -->
    <section class="hero" aria-label="Hero section">
      <div class="hero-container">
        <!-- LEFT: Telemetry & Intro -->
        <div class="hero-text">
          <p class="hero-eyebrow reveal">ORBITAL SECTOR // MUMBAI, INDIA</p>
          <h1 class="hero-name reveal" style="transition-delay:60ms">
            Hozefa<br/>
            <span class="hero-highlight-title">Lightwala</span>
          </h1>
          
          <div class="hero-role-wrapper reveal" style="transition-delay:120ms">
            <span id="typing-text"></span><span class="typing-cursor"></span>
          </div>

          <p class="hero-bio reveal" style="transition-delay:180ms">
            Enthusiastic tech leader driven to architect change through high-leverage automation. 
            I build resilient Python microservices, scalable AI/ML pipelines, and data-driven systems 
            that turn operational friction into computational velocity. Beyond the terminal, you will find me 
            exploring the intricacies of cricket strategy or immersing myself in literature and creative storytelling.
          </p>

          <div class="hero-cta reveal" style="transition-delay:240ms">
            <a href="#/projects" class="btn btn-primary btn-lg">
              <i class="fas fa-microchip"></i> Explore Projects
            </a>
            <a href="#/resume" class="btn btn-outline btn-lg">
              <i class="fas fa-file-arrow-down"></i> Access Resumes
            </a>
          </div>
        </div>

        <!-- RIGHT: Celestial Orbital Lens & Photo -->
        <div class="hero-photo-container reveal-right" style="transition-delay:180ms">
          <div class="hero-orbital-lens">
            <div class="orbital-ring-outer" aria-hidden="true"></div>
            <div class="orbital-ring-middle" aria-hidden="true"></div>
            
            <div class="orbital-photo-mask">
              <img
                id="hero-avatar"
                src="./photo1.jpeg"
                onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src='./public/photo1.jpeg';}"
                alt="Hozefa Lightwala — Professional Portrait"
                class="hero-photo"
                loading="eager"
                fetchpriority="high"
                width="320" height="320"
              />
            </div>

            <!-- Floating Astrodynamic Telemetry Badges -->
            <div class="hero-hud-badge hud-badge-1"><i class="fas fa-terminal"></i> // PYTHON.ARCH</div>
            <div class="hero-hud-badge hud-badge-2"><i class="fas fa-brain"></i> // AI.ML.SYSTEMS</div>
            <div class="hero-hud-badge hud-badge-3"><i class="fas fa-baseball-bat-ball"></i> // CRICKET.LIT</div>
          </div>

          <!-- Interactive Photo Selector Switcher -->
          <div class="photo-switcher" role="group" aria-label="Portrait selection">
            <button class="photo-switch-btn active" id="btn-photo1" aria-pressed="true">
              <i class="fas fa-circle-user"></i> Portrait 1
            </button>
            <button class="photo-switch-btn" id="btn-photo2" aria-pressed="false">
              <i class="fas fa-camera"></i> Portrait 2
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ABOUT & INTEL SECTOR ========== -->
    <section class="section" aria-labelledby="about-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">MISSION INTELLIGENCE</span>
          <h2 id="about-heading">Architecture & Core Identity</h2>
          <div class="section-divider"></div>
          <p>Where mathematical rigor meets inventive software automation</p>
        </div>

        <div class="about-grid">
          <!-- Mission Overview & Metrics -->
          <div>
            <div class="card stagger-children" style="margin-bottom:var(--space-xl)">
              <div class="card-body">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md)">
                  <div class="about-stat">
                    <span class="about-stat-number">5+</span>
                    <span class="about-stat-label">Years of Engineering</span>
                  </div>
                  <div class="about-stat">
                    <span class="about-stat-number">8.2</span>
                    <span class="about-stat-label">B.E. IT CGPA (Mumbai Univ)</span>
                  </div>
                  <div class="about-stat">
                    <span class="about-stat-number">10+</span>
                    <span class="about-stat-label">Scalable Systems Built</span>
                  </div>
                  <div class="about-stat">
                    <span class="about-stat-number">TCS</span>
                    <span class="about-stat-label">Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Creative & Personal Dimensions -->
            <div class="card reveal">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-md);color:var(--solar-amber);font-size:1.15rem;">
                  <i class="fas fa-compass" style="margin-right:8px"></i> The Dual Engine: Logic & Humanities
                </h3>
                <div style="display:flex;flex-direction:column;gap:var(--space-md)">
                  <div style="display:flex;align-items:flex-start;gap:14px">
                    <span style="font-size:1.6rem;filter:drop-shadow(0 0 8px rgba(255,170,0,0.4))">🏏</span>
                    <div>
                      <strong style="color:var(--starlight-white)">Cricket Strategist & Enthusiast</strong>
                      <p style="font-size:0.87rem;margin:2px 0 0">Analyzes field placements, bowling spells, and game momentum. The tactical composure of cricket directly mirrors architecting high-reliability systems under stress.</p>
                    </div>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:14px">
                    <span style="font-size:1.6rem;filter:drop-shadow(0 0 8px rgba(0,245,212,0.4))">✍️</span>
                    <div>
                      <strong style="color:var(--starlight-white)">Literature, Poetry & Storytelling</strong>
                      <p style="font-size:0.87rem;margin:2px 0 0">Believes code is another form of prose. Writing sharpens clarity of thought, ensuring every architecture is built with elegance, human resonance, and purpose.</p>
                    </div>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:14px">
                    <span style="font-size:1.6rem;filter:drop-shadow(0 0 8px rgba(56,189,248,0.4))">🔬</span>
                    <div>
                      <strong style="color:var(--starlight-white)">TIFR Research Lineage</strong>
                      <p style="font-size:0.87rem;margin:2px 0 0">Grounding at Tata Institute of Fundamental Research ingrained first-principles thinking and rigorous data-driven experimentation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills & Telemetry Matrix -->
          <div class="reveal-right">
            <div class="card" style="margin-bottom:var(--space-xl)">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-lg);color:var(--quantum-cyan);font-size:1.15rem;">
                  <i class="fas fa-gauge-high" style="margin-right:8px"></i> Core Proficiencies
                </h3>
                ${buildSkillBar('Python Systems & Automation Architecture', 94)}
                ${buildSkillBar('AI/ML & Natural Language Processing (NLP)', 88)}
                ${buildSkillBar('Data Science, Analysis & Statistical Modeling', 84)}
                ${buildSkillBar('FastAPI, Django & REST Microservices', 86)}
                ${buildSkillBar('SQL, Databases & Data Pipeline Pipelines', 82)}
                ${buildSkillBar('Docker, Linux Systems & CI/CD Tooling', 78)}
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-md);color:var(--starlight-white);font-size:1.05rem;">
                  <i class="fas fa-layer-group" style="margin-right:8px;color:var(--solar-amber)"></i> Ecosystem Matrix
                </h3>
                <div style="display:flex;flex-wrap:wrap;gap:8px">
                  ${['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'spaCy', 'Pandas', 'NumPy', 'SQL', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'Dataform', 'Jupyter'].map(
                    (tech, i) => `<span class="badge ${i % 3 === 0 ? 'solar' : (i % 2 === 0 ? 'starlight' : '')}">${tech}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CAREER TRAJECTORY & TIMELINE ========== -->
    <section class="section" style="background:rgba(4, 8, 20, 0.4);" aria-labelledby="timeline-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">TRAJECTORY</span>
          <h2 id="timeline-heading">Chronological Milestones</h2>
          <div class="section-divider"></div>
          <p>School foundation, collegiate exploration, fundamental research, and enterprise scale</p>
        </div>
        <div class="timeline" id="timeline-container">
          <div class="page-loader">
            <div class="spinner"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildSkillBar(name, pct) {
  return `
    <div class="skill-bar-wrapper">
      <div class="skill-bar-header">
        <span style="color:var(--starlight-white)">${name}</span>
        <span style="color:var(--solar-amber);font-family:var(--font-telemetry)">${pct}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-width="${pct}%" style="width:0"></div>
      </div>
    </div>
  `;
}

// ---- Typing effect ----
let typingTimer = null;
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const role = ROLES[roleIdx];
    if (deleting) {
      charIdx--;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
        typingTimer = setTimeout(tick, 450);
        return;
      }
    } else {
      charIdx++;
      el.textContent = role.slice(0, charIdx);
      if (charIdx === role.length) {
        typingTimer = setTimeout(() => { deleting = true; tick(); }, 2400);
        return;
      }
    }
    typingTimer = setTimeout(tick, deleting ? 35 : 75);
  }

  clearTimeout(typingTimer);
  tick();
}

// ---- Photo Switcher Controller ----
function initPhotoSwitcher() {
  const img = document.getElementById('hero-avatar');
  const btn1 = document.getElementById('btn-photo1');
  const btn2 = document.getElementById('btn-photo2');

  if (!img || !btn1 || !btn2) return;

  function setPhoto(num) {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';

    setTimeout(() => {
      if (num === 1) {
        img.src = './photo1.jpeg';
        img.onerror = () => { img.src = './public/photo1.jpeg'; };
        btn1.classList.add('active');
        btn1.setAttribute('aria-pressed', 'true');
        btn2.classList.remove('active');
        btn2.setAttribute('aria-pressed', 'false');
      } else {
        img.src = './photo2.jpeg';
        img.onerror = () => { img.src = './public/photo2.jpeg'; };
        btn2.classList.add('active');
        btn2.setAttribute('aria-pressed', 'true');
        btn1.classList.remove('active');
        btn1.setAttribute('aria-pressed', 'false');
      }
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    }, 150);
  }

  btn1.addEventListener('click', () => setPhoto(1));
  btn2.addEventListener('click', () => setPhoto(2));
}

// ---- Timeline loader ----
async function loadTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  try {
    const res = await fetch('./timeline.json');
    if (!res.ok) throw new Error('No timeline.json found');
    const data = await res.json();

    container.innerHTML = data.map((item, i) => `
      <div class="timeline-item">
        <div class="timeline-content ${item.side} card reveal${item.side === 'left' ? '-left' : '-right'}" style="transition-delay:${i * 80}ms">
          <div class="card-body">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-institution">${item.institution}</div>
            <div class="timeline-detail">${item.detail}</div>
          </div>
        </div>
        <div class="timeline-dot" style="transition-delay:${i * 80}ms">${item.icon}</div>
        <div ${item.side === 'right' ? 'style="visibility:hidden"' : ''}></div>
      </div>
    `).join('');

    window.dispatchEvent(new Event('page:rendered'));
  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-circle-exclamation"></i>
        <p>Could not load timeline: ${err.message}</p>
      </div>`;
  }
}
