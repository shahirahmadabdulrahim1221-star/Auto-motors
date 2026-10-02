/* ============================================================
   VOLTERRA — Global JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ===== PAGE TRANSITION PROGRESS BAR ===== */
  const progressBar = document.createElement('div');
  progressBar.id = 'page-progress';
  document.body.appendChild(progressBar);

  let progressTimer = null;
  let isNavigating = false;

  function startProgress() {
    if (isNavigating) return;
    isNavigating = true;
    progressBar.classList.add('active');
    let width = 0;
    progressBar.style.width = '0%';

    // Animate up to 90% — the remaining 10% completes on page load
    progressTimer = setInterval(() => {
      if (width < 90) {
        width += Math.random() * 12 + 3;
        if (width > 90) width = 90;
        progressBar.style.width = width + '%';
      }
    }, 120);
  }

  function completeProgress() {
    clearInterval(progressTimer);
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.classList.remove('active');
      progressBar.style.width = '0%';
      isNavigating = false;
    }, 400);
  }

  // Intercept all internal link clicks for smooth page transitions
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip external links, anchors, mailto, tel, target=_blank
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http') ||
      link.target === '_blank' ||
      link.hasAttribute('download')
    ) {
      return;
    }

    // Only intercept .html internal links
    if (!href.endsWith('.html')) return;

    e.preventDefault();
    startProgress();

    // Small delay so user sees the progress bar begin
    setTimeout(() => {
      window.location.href = href;
    }, 350);
  });

  // Complete progress bar when page fully loads
  window.addEventListener('load', function () {
    completeProgress();
    document.body.classList.add('loaded');
  });

  // Fallback: if load event already fired
  if (document.readyState === 'complete') {
    completeProgress();
    document.body.classList.add('loaded');
  }

  /* ===== NAV SCROLL EFFECT ===== */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  /* ===== CONFIGURATOR (index.html) ===== */
  const swatches = document.querySelectorAll('#colorSwatches .swatch');
  const configImage = document.getElementById('configImage');

  if (swatches.length && configImage) {
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const newImg = swatch.getAttribute('data-img');
        if (newImg) {
          configImage.style.opacity = '0';
          setTimeout(() => {
            configImage.src = newImg;
            configImage.style.opacity = '1';
          }, 200);
        }
      });
    });
  }

  /* ===== OPTION BUTTON GROUPS ===== */
  document
    .querySelectorAll('.wheel-options, .interior-options, .package-options')
    .forEach(group => {
      group.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });

  /* ===== HERO PARALLAX ===== */
  const heroCar = document.querySelector('.hero-car');
  if (heroCar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroCar.style.transform = `translateY(${scrolled * 0.08}px)`;
      }
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.model-card, .tech-card, .stat-item, .value-card')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

  /* ===== CONTACT FORM (contact.html) ===== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
      btn.style.background = 'linear-gradient(135deg, #00d4ff, #0066ff)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }
})();