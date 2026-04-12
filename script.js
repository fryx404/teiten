/* ========================================
   Teiten LP — script.js
   Scroll-triggered fade-in animations
   ======================================== */

(function () {
  'use strict';

  // ---- Scroll Fade-In with Intersection Observer ----
  const targets = document.querySelectorAll(
    '.hero__text, .hero__visual, .card, .bottom-cta__inner, .features__heading'
  );

  // Add the fade-in class to each target
  targets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Staggered card animation ----
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card, i) {
    card.style.transitionDelay = i * 0.12 + 's';
  });

  // ---- Header background on scroll ----
  var header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener(
      'scroll',
      function () {
        var y = window.scrollY;
        if (y > 10) {
          header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)';
        } else {
          header.style.boxShadow = 'none';
        }
        lastScroll = y;
      },
      { passive: true }
    );
  }
})();
