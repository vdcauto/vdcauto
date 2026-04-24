// ── VDC AUTO — script.js ──────────────────────────────────────────

// ── 1. SCROLL REVEAL ─────────────────────────────────────────────
document.querySelectorAll(’.reveal’).forEach(el => {
new IntersectionObserver((entries, obs) => {
entries.forEach((e, i) => {
if (e.isIntersecting) {
setTimeout(() => e.target.classList.add(‘visible’), i * 80);
obs.unobserve(e.target);
}
});
}, { threshold: 0.1 }).observe(el);
});

// ── 2. NAV SCROLL EFFECT ─────────────────────────────────────────
const nav = document.querySelector(‘nav’);
window.addEventListener(‘scroll’, () => {
nav.style.borderBottomColor = window.scrollY > 50 ? ‘rgba(224,16,16,0.4)’ : ‘rgba(224,16,16,0.25)’;
nav.style.background = window.scrollY > 50 ? ‘rgba(8,8,8,0.99)’ : ‘rgba(8,8,8,0.92)’;
});

// ── 3. MOBILE NAV ────────────────────────────────────────────────
const menuBtn = document.getElementById(‘menu-btn’);
const navLinks = document.querySelector(’.nav-links’);
if (menuBtn) {
menuBtn.addEventListener(‘click’, () => {
navLinks.classList.toggle(‘open’);
menuBtn.textContent = navLinks.classList.contains(‘open’) ? ‘✕’ : ‘☰’;
});
document.querySelectorAll(’.nav-links a’).forEach(link => {
link.addEventListener(‘click’, () => {
navLinks.classList.remove(‘open’);
menuBtn.textContent = ‘☰’;
});
});
}

// ── 4. SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll(‘a[href^=”#”]’).forEach(a => {
a.addEventListener(‘click’, function(e) {
e.preventDefault();
const t = document.querySelector(this.getAttribute(‘href’));
if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: ‘smooth’ });
});
});

// ── 5. STAT COUNTERS (fire on page load since hero is visible) ────
function animateCounter(el) {
const target = parseInt(el.dataset.target);
const suffix = el.dataset.suffix || ‘’;
let count = 0;
const steps = 60;
const inc = target / steps;
const timer = setInterval(() => {
count += inc;
if (count >= target) { count = target; clearInterval(timer); }
el.textContent = Math.floor(count) + suffix;
}, 25);
}

// Run counters when hero stats come into view
const statEls = document.querySelectorAll(’.stat-count’);
if (statEls.length) {
const statObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
animateCounter(e.target);
statObs.unobserve(e.target);
}
});
}, { threshold: 0.3 });
statEls.forEach(el => statObs.observe(el));
}

// ── 6. FORMSPREE FORM SUBMIT ─────────────────────────────────────
const fsForm = document.getElementById(‘fs-form’);
const submitBtn = document.getElementById(‘form-submit’);
const successMsg = document.getElementById(‘form-success’);

if (fsForm && submitBtn) {
fsForm.addEventListener(‘submit’, async function(e) {
e.preventDefault();

```
// Clear old errors
fsForm.querySelectorAll('.error-msg').forEach(el => el.remove());
fsForm.querySelectorAll('input, select, textarea').forEach(el => el.style.borderColor = '');

// Validate
let valid = true;
fsForm.querySelectorAll('[required]').forEach(field => {
  if (!field.value.trim()) {
    valid = false;
    field.style.borderColor = '#e01010';
    const err = document.createElement('span');
    err.className = 'error-msg';
    err.style.cssText = 'color:#e01010;font-size:12px;margin-top:4px;display:block;';
    err.textContent = 'Required.';
    field.closest('.form-group').appendChild(err);
  }
});

const email = fsForm.querySelector('input[type="email"]');
if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
  valid = false;
  email.style.borderColor = '#e01010';
}

if (!valid) return;

// Send
submitBtn.textContent = '⏳ Sending...';
submitBtn.disabled = true;
submitBtn.style.background = '#555';

try {
  const res = await fetch(fsForm.action, {
    method: 'POST',
    body: new FormData(fsForm),
    headers: { 'Accept': 'application/json' }
  });
  if (res.ok) {
    fsForm.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  } else {
    throw new Error('failed');
  }
} catch {
  submitBtn.textContent = '❌ Failed — Try Again';
  submitBtn.style.background = '#a80d0d';
  submitBtn.disabled = false;
  setTimeout(() => {
    submitBtn.textContent = '⚙️ Request Appointment';
    submitBtn.style.background = '';
  }, 3000);
}
```

});
}

// ── 7. SERVICE CARDS → SCROLL TO FORM + PREFILL ──────────────────
document.querySelectorAll(’.service-card’).forEach(card => {
card.style.cursor = ‘pointer’;
card.addEventListener(‘click’, () => {
// Prefill the select
const sel = document.querySelector(’#fs-form select’);
const title = card.querySelector(‘h3’) ? card.querySelector(‘h3’).textContent.trim() : ‘’;
if (sel && title) {
const keyword = title.split(’ ’)[0].toLowerCase();
Array.from(sel.options).forEach(opt => {
if (opt.text.toLowerCase().includes(keyword)) sel.value = opt.value;
});
}
// Scroll to contact
const contact = document.getElementById(‘contact’);
if (contact) {
window.scrollTo({ top: contact.getBoundingClientRect().top + window.scrollY - 70, behavior: ‘smooth’ });
}
});
});

// ── 8. PHONE FORMATTER ───────────────────────────────────────────
const phoneInput = document.querySelector(‘input[type=“tel”]’);
if (phoneInput) {
phoneInput.addEventListener(‘input’, (e) => {
let v = e.target.value.replace(/\D/g, ‘’).substring(0, 10);
if (v.length >= 6) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
else if (v.length >= 3) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
e.target.value = v;
});
}

// ── 9. FOOTER YEAR ───────────────────────────────────────────────
const yr = document.getElementById(‘footer-year’);
if (yr) yr.textContent = new Date().getFullYear();

// ── 10. ACTIVE NAV ON SCROLL ─────────────────────────────────────
window.addEventListener(‘scroll’, () => {
let current = ‘’;
document.querySelectorAll(‘section[id]’).forEach(s => {
if (window.scrollY >= s.offsetTop - 100) current = s.id;
});
document.querySelectorAll(’.nav-links a’).forEach(a => {
a.classList.toggle(‘active’, a.getAttribute(‘href’) === ‘#’ + current);
});
});

console.log(‘✅ VDC Auto script.js loaded successfully’);