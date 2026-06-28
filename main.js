const SUPABASE_URL = 'https://wznicchxpogzdiqeyckg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iDUHjsXn1hok3uGcfRU7dg_T7P7XEyG';

const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/207-analytix-alexandria/',
  twitter:  '#',
  instagram:'#',
  youtube:  'https://www.youtube.com/channel/UC4tTjt3QDpz65yHtGn7sNQA'
};

const PRODUCTS = {
  foreman:  '#',
  sentinel: '#'
};

// -- Supabase contact form --
async function submitToSupabase(data) {
  const custRes = await fetch(`${SUPABASE_URL}/rest/v1/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ name: data.name, email: data.email })
  });
  if (!custRes.ok) throw new Error('customer insert failed');
  const [customer] = await custRes.json();

  const engRes = await fetch(`${SUPABASE_URL}/rest/v1/engagements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify({
      customer_id: customer.id,
      interest: data.interest,
      message: data.message,
      status: 'new'
    })
  });
  if (!engRes.ok) throw new Error('engagement insert failed');
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const statusEl = document.getElementById('formStatus') || document.getElementById('formStatus-alex');

  function setStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (type ? ` form-status--${type}` : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const btn = form.querySelector('[type="submit"]');
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending…';
    setStatus('', '');
    try {
      await submitToSupabase({
        name:     form.querySelector('[name="name"]').value.trim(),
        email:    form.querySelector('[name="email"]').value.trim(),
        interest: form.querySelector('[name="interest"]').value,
        message:  form.querySelector('[name="message"]').value.trim()
      });
      form.reset();
      setStatus('Message sent — we\'ll be in touch within 24 hours.', 'success');
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please email us at hello@207analytix.com', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHTML;
    }
  });
}

// -- Theme --
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('[data-theme-pick]').forEach(btn => {
    const active = btn.dataset.themePick === theme;
    btn.classList.toggle('theme-bar__btn--active', active);
    btn.setAttribute('aria-pressed', active);
  });
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);
  document.querySelectorAll('[data-theme-pick]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themePick));
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (document.documentElement.getAttribute('data-theme') === 'system') applyTheme('system');
  });
}

// -- Social --
function initSocial() {
  document.querySelectorAll('[data-social]').forEach(link => {
    const key = link.dataset.social;
    if (SOCIAL[key] && SOCIAL[key] !== '#') {
      link.href = SOCIAL[key];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

// -- Products --
function initProducts() {
  document.querySelectorAll('[data-product]').forEach(link => {
    const key = link.dataset.product;
    const url = PRODUCTS[key];
    if (url && url !== '#') {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.classList.add('product__link--soon');
      link.addEventListener('click', e => e.preventDefault());
    }
  });
}

// -- Mobile nav --
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;
  function toggleMenu() {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  }
  hamburger.addEventListener('click', toggleMenu);
  mobileNav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) toggleMenu();
    });
  });
}

// -- Smooth scroll --
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// -- Header scroll state --
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

// -- Boot --
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSocial();
  initProducts();
  initMobileNav();
  initSmoothScroll();
  initHeaderScroll();
  initContactForm();
});
