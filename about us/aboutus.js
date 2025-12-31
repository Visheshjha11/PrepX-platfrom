(() => {
  // ---------- Helpers ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll (respects reduced motion)
  function smoothScrollTo(y = 0) {
    if (prefersReduced) {
      window.scrollTo(0, y);
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // Throttle utility
  function throttle(fn, delay = 100) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn(...args);
      }
    };
  }

  // ---------- Mobile Nav ----------
  const mobileBtn = $('#mobileMenuBtn');
  const nav = $('#primaryNav');
  const header = $('.header');

  function setNavExpanded(expanded) {
    mobileBtn.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('is-open', expanded);
    document.body.classList.toggle('no-scroll', expanded);
  }

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      setNavExpanded(!expanded);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileBtn.getAttribute('aria-expanded') === 'true') {
        setNavExpanded(false);
        mobileBtn.focus();
      }
    });

    // Close when a nav link is clicked
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      if (mobileBtn.getAttribute('aria-expanded') === 'true') {
        setNavExpanded(false);
      }
    });
  }

  // ---------- Header scrolled state ----------
  const onScroll = throttle(() => {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ---------- Back to Top ----------
  const backToTopBtn = $('#backToTop');
  if (backToTopBtn) {
    const toggleBackToTop = throttle(() => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, 100);

    backToTopBtn.addEventListener('click', () => smoothScrollTo(0));
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
  }

  // ---------- Skip link focus fix ----------
  const main = $('#mainContent');
  const skip = $('.skip-link');
  if (skip && main) {
    skip.addEventListener('click', (e) => {
      // Ensure element can receive focus
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      // Move focus after the default hash jump
      setTimeout(() => main.focus(), 0);
    });
  }

  // ---------- Anchor smooth scrolling (internal only) ----------
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 12;
      smoothScrollTo(y);
      // Focus target for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // ---------- Section reveal on scroll ----------
  const revealTargets = $$('.hero, .about-section, .mission-section, .team-section, .cta-section');
  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  // ---------- Student Access button -> login ----------
  const accessBtn = $('.student-access .access-btn');
  if (accessBtn) {
    accessBtn.addEventListener('click', () => {
      window.location.href = '../login/login.html';
    });
  }

  // ---------- Image fallback for team photos ----------
  function initialsFromAlt(alt) {
    if (!alt) return 'P X';
    // Example alt: "Vishesh - CEO & Founder"
    const name = alt.split('-')[0].trim();
    const words = name.split(/\s+/).slice(0, 2);
    return words.map(w => w[0]?.toUpperCase() || '').join(' ') || 'P X';
  }

  function placeholderSVG(alt) {
    const initials = initialsFromAlt(alt);
    const bg = 'url-encoded'; // (kept simple; we’ll inline raw SVG)
    return `data:image/svg+xml;utf8,` +
      `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#dfe7ff'/><stop offset='100%' stop-color='#eef2ff'/></linearGradient></defs>` +
      `<rect width='100%' height='100%' fill='url(#g)'/>` +
      `<circle cx='120' cy='120' r='96' fill='#ffffff' opacity='0.6'/>` +
      `<text x='50%' y='54%' text-anchor='middle' font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto' font-size='64' fill='#334155' font-weight='700'>${initials}</text>` +
      `</svg>`;
  }

  $$('.team-member .member-image img').forEach((img) => {
    const trySwap = () => {
      // Only swap to placeholder if not already a data URL
      if (!String(img.src).startsWith('data:')) {
        img.src = placeholderSVG(img.alt || '');
        img.alt = (img.alt || 'Team member') + ' (placeholder)';
      }
    };
    // If the src is "xyz" or empty, swap immediately
    if (!img.getAttribute('src') || img.getAttribute('src').toLowerCase() === 'xyz') {
      trySwap();
      return;
    }
    // Fallback on actual load error
    img.addEventListener('error', trySwap, { once: true });
  });

  // ---------- Small polish: focus ring on keyboard nav ----------
  // Adds a class to body when navigating with keyboard (for CSS :focus styles)
  let usingKeyboard = false;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (!usingKeyboard) {
        usingKeyboard = true;
        document.body.classList.add('using-keyboard');
      }
    }
  });
  window.addEventListener('mousedown', () => {
    if (usingKeyboard) {
      usingKeyboard = false;
      document.body.classList.remove('using-keyboard');
    }
  });
})();

  