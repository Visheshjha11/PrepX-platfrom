
(() => {
  "use strict";

  // ---------- small helpers ----------
  const qs  = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => [...el.querySelectorAll(sel)];
  const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ---------- 1) Mobile menu ----------
  (function initMobileMenu() {
    const btn = qs('#mobileMenuToggle');
    const nav = qs('#primaryNav');
    if (!btn || !nav) return;


    
    function set(open) {
      nav.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', String(open));
      // swap icon
      btn.innerHTML = open
        ? `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
           </svg>`
        : `<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
           </svg>`;
    }

    on(btn, 'click', () => set(!nav.classList.contains('active')));
    // close when a nav item is clicked (mobile)
    qsa('.nav-item', nav).forEach(a => on(a, 'click', () => set(false)));
    // escape key closes
    on(document, 'keydown', (e) => e.key === 'Escape' && set(false));
  })();

  // ---------- 2) Form validation & UX ----------
  (function initContactForm() {
    const form = qs('#contactForm');
    if (!form) return;

    const name    = qs('#name', form);
    const email   = qs('#email', form);
    const phone   = qs('#phone', form);
    const subject = qs('#subject', form);
    const exam    = qs('#exam', form);
    const priority= qs('#priority', form);
    const message = qs('#message', form);
    const submit  = qs('#submitBtn', form);
    const success = qs('#successMessage');

    // a tiny error UI helper using data attributes + CSS
    function setError(input, msg = '') {
      const field = input.closest('.form-field') || input;
      field.setAttribute('data-error', msg);
      field.classList.toggle('has-error', Boolean(msg));
    }

    function clearErrors() {
      qsa('[data-error]', form).forEach(el => {
        el.removeAttribute('data-error');
        el.classList.remove('has-error');
      });
    }

    function validate() {
      clearErrors();
      let ok = true;

      // name
      if (!name.value.trim()) {
        setError(name, 'Full name is required');
        ok = false;
      }

      // email
      if (!email.value.trim() || !emailRe.test(email.value)) {
        setError(email, 'Enter a valid email like name@example.com');
        ok = false;
      }

      // subject
      if (!subject.value) {
        setError(subject, 'Please choose a query type');
        ok = false;
      }

      // phone (optional but basic pattern if present)
      if (phone.value.trim() && !/^[0-9+\-\s()]{7,}$/.test(phone.value)) {
        setError(phone, 'Use digits and + - ( ) only');
        ok = false;
      }

      // message
      if (!message.value.trim()) {
        setError(message, 'Tell us a bit about your query');
        ok = false;
      }

      return ok;
    }

    // live inline feedback
    qsa('input, textarea, select', form).forEach(ctrl => {
      on(ctrl, 'input', () => setError(ctrl, ''));
      on(ctrl, 'blur', () => {
        // minimal re-check on blur
        if (ctrl === email && ctrl.value && !emailRe.test(ctrl.value)) {
          setError(ctrl, 'Email looks invalid');
        }
      });
    });

    // character count for message (DOM manipulation)
    (function initCharCount() {
      if (!message) return;
      const counter = document.createElement('div');
      counter.className = 'char-count';
      counter.setAttribute('aria-live', 'polite');
      message.after(counter);
      const max = 1000;
      const update = () => {
        const n = message.value.length;
        counter.textContent = `${n}/${max} characters`;
        if (n > max) counter.classList.add('over');
        else counter.classList.remove('over');
      };
      on(message, 'input', update);
      update();
    })();

    // autosave (arrays/objects + localStorage)
    const STORAGE_KEY = 'prepx-contact-draft';
    (function restoreDraft() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        // assign only known keys
        ({ name: name.value, email: email.value, phone: phone.value,
           subject: subject.value, exam: exam.value, priority: priority.value,
           message: message.value } = Object.assign({
             name:'',email:'',phone:'',subject:'',exam:'',priority:'medium',message:''
           }, data));
      } catch(_) {}
    })();

    const saveDraft = () => {
      const data = {
        name: name.value, email: email.value, phone: phone.value,
        subject: subject.value, exam: exam.value, priority: priority.value,
        message: message.value
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };
    on(form, 'input', saveDraft);

    // submit handler (control flow + timers + Fetch demo)
    on(form, 'submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;

      submit.disabled = true;
      submit.textContent = 'Sending...';

      // Example payload you could POST to a JSON Server / API
      const payload = {
        ...Object.fromEntries(new FormData(form)),
        createdAt: new Date().toISOString()
      };

      try {
        // Simulated network call; replace URL with your backend endpoint
        // Example: const res = await fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
        await new Promise(r => setTimeout(r, 1200)); // fake latency

        // Success UI
        success && (success.style.display = 'block');
        form.reset();
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        alert('Sorry, something went wrong. Please try again.');
        console.error(err);
      } finally {
        submit.disabled = false;
        submit.textContent = 'Send Message';
        if (success) {
          setTimeout(() => { success.style.display = 'none'; }, 5000);
        }
      }
    });
  })();

  // ---------- 3) FAQ: click-to-toggle ----------
  (function initFAQ() {
    qsa('.faq-item').forEach(item => {
      const title = qs('h3', item);
      const body  = qs('p', item);
      if (!title || !body) return;
      body.hidden = true;
      title.tabIndex = 0;
      const toggle = () => body.hidden = !body.hidden;
      on(title, 'click', toggle);
      on(title, 'keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle()));
    });
  })();

  // ---------- 4) Smooth scroll for hash links ----------
  (function initSmoothScroll() {
    qsa('a[href^="#"]').forEach(a => {
      on(a, 'click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', `#${id}`);
      });
    });
  })();

})();
