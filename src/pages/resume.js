/**
 * resume.js — Three distinct downloadable resumes for Python Developer, AI/ML, and Data Science
 */

const RESUMES = [
  {
    icon: '🐍',
    title: 'Python Developer',
    roleTag: 'SYSTEMS & AUTOMATION',
    file: './resume/python_developer.pdf',
    desc: 'Specialized in backend microservices architecture, automated data pipelines, scripting, and mission-critical enterprise engineering.',
    highlights: ['Python 3.x', 'FastAPI', 'Django', 'REST APIs', 'Process Automation', 'Docker', 'Linux', 'CI/CD'],
    accentColor: 'var(--quantum-cyan)',
    badgeClass: 'cyan',
    btnClass: 'btn-primary'
  },
  {
    icon: '🤖',
    title: 'AI / ML Engineer',
    roleTag: 'INTELLIGENT SYSTEMS',
    file: './resume/ai_ml_engineer.pdf',
    desc: 'Architecting intelligent autonomous pipelines, NLP systems, ML model lifecycle (MLOps), LLM orchestration, and heuristic automation.',
    highlights: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'spaCy / NLP', 'LLM Prompting', 'FastAPI', 'Model Serving'],
    accentColor: '#f72585',
    badgeClass: 'plasma',
    btnClass: 'btn-ghost'
  },
  {
    icon: '📊',
    title: 'Data Science',
    roleTag: 'ANALYTICS & MODELING',
    file: './resume/data_science.pdf',
    desc: 'Transforming massive telemetry and unstructured datasets into decisive quantitative models, statistical forecasts, and high-impact dashboards.',
    highlights: ['Pandas / NumPy', 'Advanced SQL', 'Exploratory Analysis', 'Statistical Inference', 'Power BI / Matplotlib'],
    accentColor: 'var(--solar-amber)',
    badgeClass: 'solar',
    btnClass: 'btn-solar'
  },
];

export function renderResume(container) {
  container.innerHTML = `
    <section class="section" aria-labelledby="resume-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">CURRICULUM VITAE</span>
          <h2 id="resume-heading">Tailored Dossiers & Resumes</h2>
          <div class="section-divider"></div>
          <p>Select the targeted domain specification that matches your hiring or project requirements</p>
        </div>

        <div class="resume-grid stagger-children">
          ${RESUMES.map(r => buildResumeCard(r)).join('')}
        </div>

        <div class="reveal" style="text-align:center;margin-top:var(--space-2xl)">
          <div class="card" style="max-width:680px;margin-inline:auto;padding:var(--space-lg)">
            <p class="text-muted" style="font-size:0.88rem;margin:0;font-family:var(--font-telemetry)">
              <i class="fas fa-circle-check" style="margin-right:8px;color:var(--quantum-cyan)"></i>
              Verified documents updated for 2026. For customized enterprise proposals or inquiries, reach out directly at 
              <a href="mailto:hozefalightwala27@gmail.com" style="color:var(--solar-amber)">hozefalightwala27@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildResumeCard(r) {
  return `
    <div class="card resume-card">
      <div class="card-body">
        <span class="resume-card-icon">${r.icon}</span>
        <span class="badge ${r.badgeClass}" style="margin-bottom:10px">${r.roleTag}</span>
        <h3 class="resume-card-title">${r.title}</h3>
        <p class="resume-card-desc">${r.desc}</p>
        
        <div class="resume-skills">
          ${r.highlights.map(h => `<span class="badge ${r.badgeClass}">${h}</span>`).join('')}
        </div>

        <a
          href="${r.file}"
          download
          class="btn ${r.btnClass} resume-download-btn"
          aria-label="Download ${r.title} resume"
        >
          <i class="fas fa-file-pdf"></i> Download Official PDF
        </a>
      </div>
    </div>
  `;
}
