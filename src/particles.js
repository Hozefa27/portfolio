/**
 * particles.js — High-Performance Celestial Constellation & Shooting Star Engine
 * Features twinkling star magnitudes, constellation linkages, interactive gravitational deflection,
 * and periodic hyper-speed shooting star meteors.
 */

export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, stars = [], meteors = [], animId;
  const mouse = { x: null, y: null, radius: 140 };

  const config = {
    starCount: 85,
    maxRadius: 2.2,
    minRadius: 0.6,
    linkDist: 110,
    colors: ['#00f5d4', '#ffaa00', '#38bdf8', '#ffffff', '#c084fc']
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return min + Math.random() * (max - min); }

  function createStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      baseRadius: rand(config.minRadius, config.maxRadius),
      radius: rand(config.minRadius, config.maxRadius),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      alpha: rand(0.2, 0.8),
      twinkleSpeed: rand(0.008, 0.025),
      twinkleDir: Math.random() > 0.5 ? 1 : -1
    };
  }

  function spawnMeteor() {
    if (meteors.length > 2) return;
    const startX = rand(W * 0.1, W * 0.9);
    const startY = rand(0, H * 0.4);
    const length = rand(80, 160);
    const speed = rand(8, 14);
    meteors.push({
      x: startX,
      y: startY,
      len: length,
      vx: speed * 1.2,
      vy: speed * 0.7,
      alpha: 1,
      fade: rand(0.015, 0.03)
    });
  }

  function init() {
    stars = Array.from({ length: config.starCount }, createStar);
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    // 1. Draw and update stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Twinkle effect
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.9) { s.alpha = 0.9; s.twinkleDir = -1; }
      else if (s.alpha <= 0.15) { s.alpha = 0.15; s.twinkleDir = 1; }

      // Mouse gravitational deflection
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          s.x -= (dx / dist) * force * 1.5;
          s.y -= (dy / dist) * force * 1.5;
        }
      }

      s.x += s.vx;
      s.y += s.vy;

      // Screen wrap
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H;
      if (s.y > H) s.y = 0;

      // Draw Star Core
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // 2. Draw Constellation Linkages
    ctx.lineWidth = 0.6;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const a = stars[i], b = stars[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.linkDist) {
          const alpha = (1 - dist / config.linkDist) * 0.16;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = '#00f5d4';
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }
    }

    // 3. Draw and update Shooting Star Meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 6, m.y - m.vy * 6);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#00f5d4');
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 6, m.y - m.vy * 6);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = m.alpha;
      ctx.stroke();

      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= m.fade;

      if (m.alpha <= 0 || m.x > W + 200 || m.y > H + 200) {
        meteors.splice(i, 1);
      }
    }

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(render);
  }

  // Periodic meteor spawn (every 4 to 8 seconds)
  setInterval(() => {
    if (Math.random() > 0.3) spawnMeteor();
  }, 4500);

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
    cancelAnimationFrame(animId);
    render();
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else render();
  });

  resize();
  init();
  render();
}
