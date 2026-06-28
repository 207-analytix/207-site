// ═══════════════════════════════════════════════════════════════════
// PLATFORM CONFIG — change ACTIVE_PLATFORM to switch hosts.
// ═══════════════════════════════════════════════════════════════════
// prettier-ignore
const PLATFORMS = {
  //  ── OPTION 1: GitHub Pages (temporary / staging) ──────────────
  //  Free. Auto-deploys via .github/workflows/pages.yml on push to main.
  //  URL: https://207-analytix.github.io/207-site
  github: {
    siteUrl:  'https://207-analytix.github.io/207-site',
    basePath: '/207-site',   // prefix for all internal hrefs if needed
    label:    'GitHub Pages',
  },

  //  ── OPTION 2: Netlify (current / production) ──────────────────
  //  Config lives in netlify.toml. Connect repo in Netlify dashboard.
  //  Disable the GitHub Pages workflow when using this.
  netlify: {
    siteUrl:  'https://207analytix.com',
    basePath: '',
    label:    'Netlify',
  },

  //  ── OPTION 3: Vercel ──────────────────────────────────────────
  //  Add a vercel.json to the repo root when activating.
  //  Disable the GitHub Pages workflow when using this.
  vercel: {
    siteUrl:  'https://207analytix.com',
    basePath: '',
    label:    'Vercel',
  },
};

// ▼▼▼  SET THIS to 'github' | 'netlify' | 'vercel'  ▼▼▼
const ACTIVE_PLATFORM = 'github';
// ▲▲▲ ─────────────────────────────────────────────  ▲▲▲

const PLATFORM = PLATFORMS[ACTIVE_PLATFORM];

// ═══════════════════════════════════════════════════════════════════
// SOCIAL & PRODUCT LINKS
// ═══════════════════════════════════════════════════════════════════
const SOCIAL = {
  linkedin:  '',
  twitter:   '',
  instagram: '',
  youtube:   '',
};

const PRODUCTS = {
  foreman:  '',
  sentinel: '',
};

// ═══════════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════════
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
  const saved = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || 'system');
  document.querySelectorAll('[data-theme-pick]').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themePick));
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (document.documentElement.getAttribute('data-theme') === 'system') applyTheme('system');
  });
}

// ═══════════════════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════════════════
function initSocial() {
  document.querySelectorAll('[data-social]').forEach(link => {
    const key = link.dataset.social;
    if (SOCIAL[key] && SOCIAL[key] !== '') {
      link.href = SOCIAL[key];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// PRODUCT LINKS
// ═══════════════════════════════════════════════════════════════════
function initProducts() {
  document.querySelectorAll('[data-product]').forEach(link => {
    const key = link.dataset.product;
    const url = PRODUCTS[key];
    if (url && url !== '') {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.classList.add('product-link--soon');
      link.addEventListener('click', e => e.preventDefault());
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════════════════
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
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { if (mobileNav.classList.contains('open')) toggleMenu(); });
  });
}

// ═══════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// HEADER SCROLL STATE
// ═══════════════════════════════════════════════════════════════════
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSocial();
  initProducts();
  initMobileNav();
  initSmoothScroll();
  initHeaderScroll();

  // Dev helper — remove in production if desired
  console.info(`[207 Analytix] Platform: ${PLATFORM.label} | ${PLATFORM.siteUrl}`);
});
