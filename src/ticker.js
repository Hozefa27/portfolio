/**
 * ticker.js — Loads news.json and animates the telemetry ticker
 */

export async function initTicker() {
  const el = document.getElementById('tickerContent');
  if (!el) return;

  try {
    const res = await fetch('./news.json');
    if (!res.ok) throw new Error('No news.json');
    const news = await res.json();

    // Duplicate for seamless loop
    const items = [...news, ...news];
    el.innerHTML = items.map(n => `<span>${n.text}</span>`).join(
      '<span style="color:var(--solar-amber);margin-inline:1.5rem;font-size:0.75rem">◈</span>'
    );
  } catch {
    el.innerHTML = '<span>⚡ HOZEFA LIGHTWALA ◈ Python · AI/ML Systems · Data Science ◈ TCS ◈ Mumbai, India</span>';
  }
}
