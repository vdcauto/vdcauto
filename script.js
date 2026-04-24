// ── VDC AUTO — script.js ──────────────────────────────────────────

// ── 1. SCROLL REVEAL ──────────────────────────────────────────────
const reveals = document.querySelectorAll(’.reveal’);
const revealObserver = new IntersectionObserver((entries) => {
entries.forEach((e, i) => {
if (e.isIntersecting) {
setTimeout(() => e.target.classList.add(‘visible’), i * 80);
revealObserver.unobserve(e.target);
}
});
}, { threshold: 0.1 });
reveals.forEach(r => revealObserver.observe(r));

// ── 2. NAV SCROLL EFFECT ──────────────────────────────────────────
const nav = document.querySelector(‘nav’);
window.addEventListener(‘scroll’, () => {
if (window.scrollY > 50) {
nav.style.borderBottomColor = ‘rgba(224,16,16,0.4)’;
nav.style.background = ‘rgba(8,8,8,0.98)’;
} else {
nav.style.borderBottomColor = ‘rgba(224,16,16,0.25)’;
nav.style.background = ‘rgba(8,8,8,0.92)’;
}
});

// ── 3. MOBILE NAV TOGGLE ─────────────────────────────────────────
const menuBtn = document.getElementById(‘menu-btn’);
const navLinks = document.querySelector(’.nav-links’);
if (menuBtn) {
menuBtn.addEventListener(‘click’, () => {
navLinks.classList.toggle(‘open’);
menuBtn.textContent = navLinks.classList.contains(‘open’) ? ‘✕’ : ‘☰’;
});
}

// Close menu when a link is tapped
document.querySelectorAll(’.nav-links a’).forEach(link => {
link.addEventListener(‘click’, () => {
navLinks.classList.remove(‘open’);
if (menuBtn) menuBtn.textContent = ‘☰’;
});
});

// ── 4. SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────────────────────────
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute(‘href’));
if (target) {
const offset = 70; // nav height
const top = target.getBoundingClientRect().top + window.scrollY - offset;
window.scrollTo({ top, behavior: ‘smooth’ });
}
});
});

// ── 5. BOOKING FORM VALIDATION & SUBMIT ──────────────────────────
const form = document.getElementById(‘booking-form’);
const submitBtn = document.getElementById(‘form-submit’);

function showError(input, msg) {
const group = input.closest(’.form-group’);
let err = group.querySelector(’.error-msg’);
if (!err) {
err = document.createElement(‘span’);
err.className = ‘error-msg’;
err.style.cssText = ‘color:#e01010;font-size:12px;margin-top:4px;display:block;’;
group.appendChild(err);
}
err.textContent = msg;
input.style.borderColor = ‘#e01010’;
}

function clearError(input) {
const group = input.closest(’.form-group’);
const err = group.querySelector(’.error-msg’);
if (err) err.remove();
input.style.borderColor = ‘’;
}

function validateForm() {
let valid = true;
const fields = form.querySelectorAll(‘input, select, textarea’);

fields.forEach(field => {
clearError(field);
if (!field.value.trim()) {
showError(field, ‘This field is required.’);
valid = false;
}
});

const phone = form.querySelector(‘input[type=“tel”]’);
if (phone && phone.value && !/^(\d{3})?[\s-]?\d{3}[\s-]?\d{4}$/.test(phone.value.trim())) {
showError(phone, ‘Enter a valid phone number.’);
valid = false;
}

const email = form.querySelector(‘input[type=“email”]’);
if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
showError(email, ‘Enter a valid email address.’);
valid = false;
}

return valid;
}

if (submitBtn) {
submitBtn.addEventListener(‘click’, () => {
if (!validateForm()) return;

submitBtn.textContent = '⏳ Sending...';
submitBtn.disabled = true;
submitBtn.style.background = '#555';

setTimeout(() => {
  submitBtn.textContent = '✅ Request Sent!';
  submitBtn.style.background = '#1a7a1a';

  // Clear form
  form.querySelectorAll('input, textarea').forEach(f => f.value = '');
  form.querySelectorAll('select').forEach(s => s.selectedIndex = 0);

  setTimeout(() => {
    submitBtn.textContent = '⚙️ Request Appointment';
    submitBtn.style.background = '';
    submitBtn.disabled = false;
  }, 4000);
}, 1500);

});
}

// ── 6. ANIMATED STAT COUNTERS ────────────────────────────────────
function animateCounter(el, target, suffix) {
let count = 0;
const duration = 1500;
const steps = 60;
const increment = target / steps;
const interval = duration / steps;

const timer = setInterval(() => {
count += increment;
if (count >= target) {
count = target;
clearInterval(timer);
}
el.textContent = Math.floor(count) + suffix;
}, interval);
}

const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
const el = e.target;
const target = parseInt(el.dataset.target);
const suffix = el.dataset.suffix || ‘’;
animateCounter(el, target, suffix);
statsObserver.unobserve(el);
}
});
}, { threshold: 0.5 });

document.querySelectorAll(’.stat-count’).forEach(el => statsObserver.observe(el));

// ── 7. ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
const sections = document.querySelectorAll(‘section[id]’);
const navItems = document.querySelectorAll(’.nav-links a’);

window.addEventListener(‘scroll’, () => {
let current = ‘’;
sections.forEach(section => {
const sectionTop = section.offsetTop - 100;
if (window.scrollY >= sectionTop) current = section.getAttribute(‘id’);
});

navItems.forEach(link => {
link.classList.remove(‘active’);
if (link.getAttribute(‘href’) === ‘#’ + current) {
link.classList.add(‘active’);
}
});
});

// ── 8. PHONE NUMBER FORMATTER ─────────────────────────────────────
const phoneInput = document.querySelector(‘input[type=“tel”]’);
if (phoneInput) {
phoneInput.addEventListener(‘input’, (e) => {
let val = e.target.value.replace(/\D/g, ‘’).substring(0, 10);
if (val.length >= 6) {
val = `(${val.substring(0,3)}) ${val.substring(3,6)}-${val.substring(6)}`;
} else if (val.length >= 3) {
val = `(${val.substring(0,3)}) ${val.substring(3)}`;
}
e.target.value = val;
});
}

// ── 9. CURRENT YEAR IN FOOTER ────────────────────────────────────
const yearEl = document.getElementById(‘footer-year’);
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── 10. SERVICE CARD CLICK → SCROLL TO BOOKING ───────────────────
document.querySelectorAll(’.service-card’).forEach(card => {
card.style.cursor = ‘pointer’;
card.addEventListener(‘click’, () => {
const contact = document.querySelector(’#contact’);
const serviceSelect = document.querySelector(’#booking-form select’);
const serviceName = card.querySelector(‘h3’)?.textContent;

if (serviceSelect && serviceName) {
  Array.from(serviceSelect.options).forEach(opt => {
    if (opt.text.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])) {
      serviceSelect.value = opt.value;
    }
  });
}

if (contact) {
  const top = contact.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: 'smooth' });
}

});
});

console.log('✅ VDC Auto — script.js loaded successfully');
