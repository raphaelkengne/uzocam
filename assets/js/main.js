/**
 * UZOCAM EMPIRE – Main JavaScript
 * Scroll-driven image sequence + interactions
 */

(function () {
  'use strict';

  // ---------- Header scroll ----------
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');

  function onScrollHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  // Mobile nav
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Product filters ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---------- Contact form (client-side) ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const interest = form.interest.value;
      const message = form.message.value.trim();

      let text = `Bonjour UZOCAM EMPIRE,%0A%0A`;
      text += `Nom : ${encodeURIComponent(name)}%0A`;
      text += `Téléphone : ${encodeURIComponent(phone)}%0A`;
      if (interest) text += `Intérêt : ${encodeURIComponent(interest)}%0A`;
      if (message) text += `%0AMessage : ${encodeURIComponent(message)}`;

      window.open(`https://wa.me/237677005490?text=${text}`, '_blank');
    });
  }

  // ---------- Scroll-driven Image Sequence ----------
  const cinematic = document.getElementById('cinematic');
  const canvas = document.getElementById('sequenceCanvas');
  const progressBar = document.getElementById('progressBar');
  const textSteps = document.querySelectorAll('.cinematic-text');

  if (!cinematic || !canvas) return;

  // Prefer reduced motion → skip heavy animation
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    textSteps.forEach((el, i) => {
      if (i === 0) el.classList.add('active');
    });
    return;
  }

  const ctx = canvas.getContext('2d');
  let images = [];
  let currentFrame = 0;
  let isLoaded = false;
  let canvasW = 0;
  let canvasH = 0;

  // Sequence built from available product images
  // Order creates a visual progression: cold equipment → machines → performance
  const sequenceSources = [
    'assets/images/clim1.jpg',
    'assets/images/clim2.jpg',
    'assets/images/clim4.jpg',
    'assets/images/glace1.jpg',
    'assets/images/glace3.jpg',
    'assets/images/glace2.jpg',
    'assets/images/shawarma1.jpg',
    'assets/images/shawarma2.jpg',
    'assets/images/lave1.jpg',
    'assets/images/lave3.jpg',
    'assets/images/incub1.jpg',
    'assets/images/incub2.jpg',
    'assets/images/comp1.jpg',
    'assets/images/comp2.jpg',
    'assets/images/congel.jpg',
    'assets/images/banner2.jpg'
  ];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (isLoaded) drawFrame(currentFrame);
  }

  function drawFrame(index) {
    if (!images[index] || !images[index].complete) return;
    const img = images[index];
    const scale = Math.max(canvasW / img.width, canvasH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvasW - w) / 2;
    const y = (canvasH - h) / 2;

    // Dark overlay for text readability
    ctx.fillStyle = '#0A2A4A';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.globalAlpha = 0.85;
    ctx.drawImage(img, x, y, w, h);
    ctx.globalAlpha = 1;

    // Gradient overlay bottom
    const grad = ctx.createLinearGradient(0, canvasH * 0.5, 0, canvasH);
    grad.addColorStop(0, 'rgba(10,42,74,0)');
    grad.addColorStop(1, 'rgba(10,42,74,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  function loadImages() {
    let loaded = 0;
    const total = sequenceSources.length;

    sequenceSources.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === total) {
          isLoaded = true;
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) {
          isLoaded = true;
          drawFrame(0);
        }
      };
      images[i] = img;
    });
  }

  function updateSequence() {
    const rect = cinematic.getBoundingClientRect();
    const sectionHeight = cinematic.offsetHeight - window.innerHeight;
    let progress = 0;

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      progress = Math.min(1, Math.max(0, -rect.top / sectionHeight));
    } else if (rect.top > 0) {
      progress = 0;
    } else {
      progress = 1;
    }

    const frameIndex = Math.min(
      images.length - 1,
      Math.floor(progress * (images.length - 1))
    );

    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      drawFrame(currentFrame);
    }

    // Progress bar
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }

    // Text steps (5 steps)
    const step = Math.min(4, Math.floor(progress * 5));
    textSteps.forEach((el, i) => {
      el.classList.toggle('active', i === step);
    });
  }

  // Throttled scroll with rAF
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateSequence();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    updateSequence();
  }, { passive: true });

  // Init
  resizeCanvas();
  loadImages();
  updateSequence();

})();
