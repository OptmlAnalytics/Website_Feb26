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
   Native browser POST to hidden_iframe keeps user on page.
   No fetch / no preventDefault — browser handles encoding.  */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    }, 1500);
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
  optistock: [
    { src: 'img/products/OptiStock_1.png', caption: 'Scenario Management — Upload Excel datasets, manage multiple inventory scenarios, and track optimization status. Each scenario stores 100+ SKUs across 25+ locations.' },
    { src: 'img/products/OptiStock_3.png', caption: 'ABC-XYZ Segmentation — Automatic classification by demand velocity (A/B/C) and variability (X/Y/Z). Segment distribution chart and tailored stocking strategies per segment.' },
    { src: 'img/products/OptiStock_4.png', caption: 'Executive Dashboard — Total inventory ($12.2M), Days of Inventory (16.3d), service level (96%), and SKU status distribution. Stacked safety vs cycle stock chart by planning period.' },
    { src: 'img/products/OptiStock_5.png', caption: 'Algorithm Comparison — Side-by-side Simple Safety Stock vs Multi-Echelon optimization. Compare total inventory, safety stock, DOI, and CFR metrics with visual bar chart.' },
    { src: 'img/products/OptiStock_6.png', caption: 'Inventory Glidepath — Period-by-period trend showing total inventory value and safety stock trajectory across Q1–Q4 planning horizon with period summary panel.' },
    { src: 'img/products/OptiStock_7.png', caption: 'SKU Health Monitor — Granular view of every SKU-location with safety stock, cycle stock, DOI, and status. Filter by category, status, velocity, or search by product ID.' },
  ],
  routesolve: [
    { src: 'img/products/RouteSolve_1.png', caption: 'Landing Page — Choose to load sample data or upload custom network data. Built with Google OR-Tools VRP solver, Streamlit, Plotly, and PyDeck mapping.' },
    { src: 'img/products/RouteSolve_2.png', caption: 'Baseline Network — Interactive PyDeck map showing 8 plants (red), 12 depots (blue), 200 customers (green), and 3,066 shipments with plant-to-depot connection lanes.' },
    { src: 'img/products/RouteSolve_3.png', caption: 'Network Statistics — Plant, depot, customer, and equipment counts. Total shipments, move type distribution, and average shipment weight KPIs with data tables below.' },
    { src: 'img/products/RouteSolve_5.png', caption: 'Scenario Manager — Create named what-if scenarios with custom descriptions. Modify network elements, adjust volumes and cost rates, configure optimization parameters.' },
  ],
  accessmap: [
    { src: 'img/products/AccessMap_1.png', caption: 'Facility Management — Upload facility master from CSV/Excel, manage facilities with zoom and isochrone buttons. Interactive Leaflet map with OpenStreetMap basemap.' },
    { src: 'img/products/AccessMap_3.png', caption: 'Map View — All facilities plotted on an interactive map with auto-fit bounds. Supports multiple basemap styles and facility labels toggle.' },
    { src: 'img/products/AccessMap_4.png', caption: 'Analysis Tab — Configure isochrone settings: travel mode (car, HGV, cycling, walking), band type (time or distance), and generate service area polygons with population estimates.' },
    { src: 'img/products/AccessMap_5.png', caption: 'Scenario Comparison — Create named scenarios selecting specific facilities, run batch analysis, and compare population coverage across different network configurations.' },
  ],
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
