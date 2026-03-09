/* ═══════════════════════════════════════════════════════════
   OPTIMODEL ANALYTICS — SHARED JS v6
   ═══════════════════════════════════════════════════════════ */

/* ── Navbar scroll effect ──────────────────────────────────── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu toggle ────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = toggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });
}

/* ── Active nav link ───────────────────────────────────────── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Fade-in on scroll ─────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── Newsletter form (demo — logs to console) ──────────────── */
const nlForm = document.querySelector('.newsletter-form');
if (nlForm) {
  nlForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = nlForm.querySelector('input').value;
    if (email) {
      nlForm.innerHTML = '<p style="color:#fff;font-weight:600;">Thank you! You\'re on the list.</p>';
    }
  });
}

/* ── Contact form (Google Forms proxy) ────────────────────────
   Uses URLSearchParams so Google Forms receives
   application/x-www-form-urlencoded (the only format it
   accepts from external origins).                           */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const action = contactForm.getAttribute('action');
    const body = new URLSearchParams(new FormData(contactForm));
    fetch(action, { method: 'POST', mode: 'no-cors', body })
      .finally(() => {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      });
  });
}

/* ── Animated counter for stats ────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

/* ── Product Screenshot Lightbox ───────────────────────────── */
const LIGHTBOX_DATA = {
  demandlens: [
    { src: 'img/products/DemandLens_1.png', caption: 'Data Ingestion — Upload CSV or Excel demand history. Instant preview with row count, SKU count, region & channel breakdown, and promo coverage stats.' },
    { src: 'img/products/DemandLens_2.png', caption: 'Describe — One-click analysis summarises your data into key KPIs, an aggregated demand trend chart, and a demand-by-category breakdown.' },
    { src: 'img/products/DemandLens_3.png', caption: 'Demand Profile — Regional split, channel mix, weekly seasonality, top-10 SKUs by volume, and a monthly category heatmap — all in one view.' },
    { src: 'img/products/DemandLens_4.png', caption: 'Diagnose — ABC-XYZ segmentation runs automatically. Pareto chart and XYZ variability matrix classify every SKU by value and demand regularity.' },
    { src: 'img/products/DemandLens_5.png', caption: 'Demand Pattern Classification — Syntetos-Boylan quadrant maps each SKU as Smooth, Intermittent, Erratic or Lumpy; exportable classification table included.' },
    { src: 'img/products/DemandLens_6.png', caption: 'Predict — Configure forecast horizon and train/test split, then benchmark SES, Holt-Winters, ARIMA, LightGBM and Prophet side-by-side with MAPE and Bias metrics.' },
    { src: 'img/products/DemandLens_7.png', caption: 'Prescribe — Safety stock recommendations per SKU at target service level, MAPE-tiered forecast accuracy, and ABC-XYZ action plans (Critical / Optimise / Monitor).' },
  ],
  netsolve: [
    { src: 'img/products/NetSOlve_1.png', caption: 'Scenario Management — Create and manage named supply chain scenarios, each backed by your own uploaded dataset for independent analysis.' },
    { src: 'img/products/NetSOlve_2.png', caption: 'Demand-Capacity Overview — Interactive network map showing production assets, demand nodes, utilisation rate, and total network capacity at a glance.' },
    { src: 'img/products/NetSOlve_3.png', caption: 'Transportation Overview — Visualise all active lanes and shipment flows, total transport cost, trip volume, and service level performance across the network.' },
    { src: 'img/products/NetSOlve_4.png', caption: 'Monthly Demand Trends — SKU-level monthly demand bar chart with peak-month detection, annual volume KPIs, and active SKU count.' },
    { src: 'img/products/NetSOlve_5.png', caption: 'Monthly Supply Plan — Planned vs. actual production chart by month; tracks plant utilisation, plan attainment, and capacity gaps.' },
    { src: 'img/products/NetSOlve_6.png', caption: 'Inventory Health — Opening stock vs. safety stock by month, with days-on-hand, inventory turnover, and closing stock KPIs across all sites.' },
    { src: 'img/products/NetSOlve_7.png', caption: 'User Guide & Reference — Built-in documentation covering every KPI definition, calculation logic, and downloadable admin report for each analysis module.' },
  ],
};

let lbProduct = null, lbIndex = 0;

function openLightbox(product, index) {
  lbProduct = product;
  lbIndex = index;
  renderLightbox();
  document.getElementById('product-lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('product-lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  const slides = LIGHTBOX_DATA[lbProduct];
  lbIndex = (lbIndex + dir + slides.length) % slides.length;
  renderLightbox();
}

function renderLightbox() {
  const slides = LIGHTBOX_DATA[lbProduct];
  const slide = slides[lbIndex];
  const img = document.getElementById('lightbox-img');
  img.style.opacity = '0';
  img.src = slide.src;
  img.onload = () => { img.style.transition = 'opacity .2s'; img.style.opacity = '1'; };
  document.getElementById('lightbox-caption-text').textContent = slide.caption;
  document.getElementById('lightbox-counter').textContent = `${lbIndex + 1} / ${slides.length}`;
}

/* Double-click on previewable cards */
document.querySelectorAll('.product-previewable').forEach(card => {
  card.addEventListener('dblclick', () => {
    const product = card.dataset.product;
    if (LIGHTBOX_DATA[product]) openLightbox(product, 0);
  });
});

/* Close on overlay click, keyboard navigation */
document.getElementById('product-lightbox')?.addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', e => {
  const lb = document.getElementById('product-lightbox');
  if (!lb?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
});
