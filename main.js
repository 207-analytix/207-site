const SOCIAL = {
  linkedin: '#',
  twitter: '#',
  instagram: '#',
  youtube: '#'
};

const PRODUCTS = {
  foreman: '#',
  sentinel: '#'
};

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
    if (document.documentElement.getAttribute('data-theme') === 'system') {
      applyTheme('system');
    }
  });
}

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

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSocial();
  initProducts();
  initMobileNav();
  initSmoothScroll();
  initHeaderScroll();
});