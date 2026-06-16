// NikolasPT — Shared JS

// Nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Active nav link highlight on scroll (home only, sections with id)
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === '#' + cur) a.style.color = 'var(--white)';
    });
  }, { passive: true });
}

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  const btn = e.target.querySelector('button[type=submit]');
  if (success) success.style.display = 'block';
  if (btn) btn.disabled = true;
}

// Interactive pricing cards (3D stack effect)
function initPricingCards() {
  const stack = document.getElementById('prijzenStack');
  if (!stack) return;
  const cards = stack.querySelectorAll('.prijs-3d-card');

  function activateCard(card) {
    cards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
    stack.classList.add('has-active');
  }
  function resetCards() {
    cards.forEach(c => c.classList.remove('is-active'));
    stack.classList.remove('has-active');
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => activateCard(card));
    card.addEventListener('click', () => activateCard(card));
  });
  stack.addEventListener('mouseleave', () => resetCards());

  let lastTapped = null;
  cards.forEach(card => {
    card.addEventListener('touchstart', () => {
      if (lastTapped === card) { resetCards(); lastTapped = null; }
      else { activateCard(card); lastTapped = card; }
    }, { passive: true });
  });
}
initPricingCards();
