/**
 * resume.js — Unified downloadable resume for Python, Data Science, and AI/ML engineering
 */

const RESUME = {
  icon: '🧠',
  title: 'Python / Data Science / AI-ML Engineer',
  roleTag: 'ENGINEERING • ANALYTICS • INTELLIGENT SYSTEMS',
  file: './resume/python_data_science_ai_ml_engineer.pdf',
  desc: 'Combines Python backend engineering and automation with data analysis, statistical modeling, and production-ready AI/ML. Experienced in turning complex enterprise data into reliable pipelines, predictive insights, and intelligent applications.',
  highlights: ['Python & APIs', 'Automation & ETL', 'Pandas / NumPy / SQL', 'Statistical Modeling', 'Scikit-learn / PyTorch', 'NLP & LLMs', 'Model Serving', 'Docker & Linux'],
  badgeClass: 'cyan',
  btnClass: 'btn-primary'
};

export function renderResume(container) {
  container.innerHTML = `
    <section class="section" aria-labelledby="resume-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">CURRICULUM VITAE</span>
          <h2 id="resume-heading">Python, Data Science & AI/ML Engineer</h2>
          <div class="section-divider"></div>
          <p>One resume covering Python engineering, data science, and AI/ML development</p>
        </div>

        <div class="resume-grid stagger-children">
          ${buildResumeCard(RESUME)}
        </div>

        <div class="reveal" style="text-align:center;margin-top:var(--space-2xl)">
          <div class="card" style="max-width:680px;margin-inline:auto;padding:var(--space-lg)">
            <p class="text-muted" style="font-size:0.88rem;margin:0;font-family:var(--font-telemetry)">
              <i class="fas fa-circle-check" style="margin-right:8px;color:var(--quantum-cyan)"></i>
              Resume updated for 2026. For customized enterprise proposals or inquiries, reach out directly at 
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
