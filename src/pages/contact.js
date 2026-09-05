/**
 * contact.js — Transmission console, contact coordinates, social channels, and Netlify submission
 */

export function renderContact(container) {
  container.innerHTML = `
    <section class="section" aria-labelledby="contact-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-kicker">COMMUNICATIONS LINK</span>
          <h2 id="contact-heading">Establish Transmission</h2>
          <div class="section-divider"></div>
          <p>Direct channel for leadership opportunities, automation consulting, and technical collaboration</p>
        </div>

        <div class="contact-grid">

          <!-- LEFT: Telemetry & Contact Coordinates -->
          <div class="reveal-left">
            <div class="card" style="margin-bottom:var(--space-xl)">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-xl);color:var(--starlight-white);font-size:1.2rem">
                  <i class="fas fa-satellite" style="color:var(--quantum-cyan);margin-right:8px"></i> Direct Coordinates
                </h3>

                <div class="contact-info-item">
                  <div class="contact-info-icon"><i class="fas fa-user-astronaut"></i></div>
                  <div>
                    <div class="contact-info-label">Identity</div>
                    <div class="contact-info-value">Hozefa Lightwala</div>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon"><i class="fas fa-location-crosshairs"></i></div>
                  <div>
                    <div class="contact-info-label">Current Orbit</div>
                    <div class="contact-info-value">Byculla, Mumbai, Maharashtra, India 🇮🇳</div>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon"><i class="fas fa-phone-volume"></i></div>
                  <div>
                    <div class="contact-info-label">Voice & WhatsApp</div>
                    <div class="contact-info-value">
                      <a href="tel:+918850302165" style="color:var(--starlight-white)">+91 88503 02165</a>
                    </div>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon"><i class="fas fa-envelope-open-text"></i></div>
                  <div>
                    <div class="contact-info-label">Electronic Mail</div>
                    <div class="contact-info-value">
                      <a href="mailto:hozefalightwala27@gmail.com" style="color:var(--quantum-cyan)">hozefalightwala27@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon" style="background:rgba(255,170,0,0.1);border-color:rgba(255,170,0,0.3);color:var(--solar-amber)">
                    <i class="fas fa-satellite-dish"></i>
                  </div>
                  <div>
                    <div class="contact-info-label">Telemetry Status</div>
                    <div class="contact-info-value" style="color:var(--solar-amber)">Open to Python & AI/ML Opportunities</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Networks Console -->
            <div class="card">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-md);color:var(--starlight-white);font-size:1.05rem">
                  <i class="fas fa-share-nodes" style="color:var(--solar-amber);margin-right:8px"></i> Secure Networks
                </h3>
                <div class="social-grid">
                  <a href="https://www.linkedin.com/in/hozefalightwala27" target="_blank" rel="noopener noreferrer" class="social-btn">
                    <i class="fab fa-linkedin-in" style="color:#0077b5"></i> LinkedIn
                  </a>
                  <a href="https://github.com/Hozefa27/" target="_blank" rel="noopener noreferrer" class="social-btn">
                    <i class="fab fa-github" style="color:#fff"></i> GitHub
                  </a>
                  <a href="https://www.instagram.com/huzefa_78652" target="_blank" rel="noopener noreferrer" class="social-btn">
                    <i class="fab fa-instagram" style="color:#e1306c"></i> Instagram
                  </a>
                  <a href="mailto:hozefalightwala27@gmail.com" class="social-btn">
                    <i class="fas fa-envelope" style="color:var(--quantum-cyan)"></i> Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Transmission Console Form -->
          <div class="reveal-right">
            <div class="card">
              <div class="card-body">
                <h3 style="margin-bottom:var(--space-lg);color:var(--starlight-white);font-size:1.2rem">
                  <i class="fas fa-paper-plane" style="color:var(--quantum-cyan);margin-right:8px"></i> Dispatch Message
                </h3>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  id="contact-form"
                  novalidate
                >
                  <p style="display:none" aria-hidden="true">
                    <label>Antispam: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
                  </p>
                  <input type="hidden" name="form-name" value="contact" />

                  <div class="form-group">
                    <label class="form-label" for="cf-name">// SENDER IDENTITY *</label>
                    <input
                      class="form-input"
                      type="text"
                      id="cf-name"
                      name="name"
                      required
                      minlength="2"
                      maxlength="100"
                      placeholder="Your Name / Organization"
                      autocomplete="name"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="cf-email">// RETURN TRANSMISSION ADDRESS *</label>
                    <input
                      class="form-input"
                      type="email"
                      id="cf-email"
                      name="email"
                      required
                      maxlength="200"
                      placeholder="your.email@company.com"
                      autocomplete="email"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="cf-subject">// TRANSMISSION SUBJECT</label>
                    <input
                      class="form-input"
                      type="text"
                      id="cf-subject"
                      name="subject"
                      maxlength="200"
                      placeholder="Python Role / AI Architecture / Consultation"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="cf-message">// PAYLOAD / MESSAGE *</label>
                    <textarea
                      class="form-textarea"
                      id="cf-message"
                      name="message"
                      required
                      minlength="10"
                      maxlength="2000"
                      placeholder="Detail your inquiry, project scope, or opportunity..."
                    ></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center" id="cf-submit">
                    <i class="fas fa-bolt"></i> Send Encrypted Transmission
                  </button>
                </form>

                <div id="form-success" style="display:none;text-align:center;padding:var(--space-xl)">
                  <div style="font-size:3.2rem;margin-bottom:12px;filter:drop-shadow(0 0 15px var(--quantum-cyan-glow))">📡</div>
                  <h3 style="color:var(--quantum-cyan)">Transmission Dispatched!</h3>
                  <p class="text-muted" style="margin-top:8px">Your message has been received on the private channel. I will respond within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  initContactForm();
}

function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const submit  = document.getElementById('cf-submit');

  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email transmission address.', 'error');
      return;
    }

    const botField = form.querySelector('[name="bot-field"]').value;
    if (botField) return;

    submit.disabled = true;
    submit.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Transmitting...';

    try {
      const data = new FormData(form);
      const res  = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });

      if (res.ok || res.status === 200) {
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        throw new Error('Local server preview mode');
      }
    } catch {
      // In local preview without Netlify forms handler, provide friendly fallback
      submit.disabled = false;
      submit.innerHTML = '<i class="fas fa-bolt"></i> Send Encrypted Transmission';
      showToast('Direct transmission channel: hozefalightwala27@gmail.com', 'solar');
      // Also open user email client as instant fallback
      window.location.href = `mailto:hozefalightwala27@gmail.com?subject=${encodeURIComponent(form.querySelector('[name="subject"]')?.value || 'Portfolio Inquiry')}&body=${encodeURIComponent(message)}`;
    }
  });
}

function showToast(msg, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className   = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 4000);
}
