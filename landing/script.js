// Enhanced Mobile Menu Toggle with Better UX
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const isOpen = nav.classList.contains("mobile-open");

      if (isOpen) {
        // Close menu
        nav.classList.remove("mobile-open");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");

        // Enable scrolling
        body.style.overflow = "";
      } else {
        // Open menu
        nav.classList.add("mobile-open");
        mobileMenuBtn.classList.add("active");
        body.classList.add("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "true");

        // Disable scrolling when menu is open
        body.style.overflow = "hidden";
      }
    });

    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove("mobile-open");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("mobile-open")) {
        nav.classList.remove("mobile-open");
        mobileMenuBtn.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      }
    });
  }
}

// Back to Top Button
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
  `;
  backToTopBtn.setAttribute("aria-label", "Back to top");

  document.body.appendChild(backToTopBtn);

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  // Scroll to top functionality
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Listen for scroll events
  window.addEventListener("scroll", toggleBackToTop);

  // Initial check
  toggleBackToTop();
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  // Add smooth scroll behavior to all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#" || href === "#!") {
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed header
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add staggered animation for multiple elements
        const siblings = entry.target.parentElement?.querySelectorAll(
          ".feature-card, .pricing-card, .cta-card"
        );
        if (siblings) {
          siblings.forEach((sibling, index) => {
            setTimeout(() => {
              sibling.classList.add("animate-in");
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".feature-card, .pricing-card, .cta-card, .hero-content, .section-title"
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // Add scroll-based header effects
  const header = document.querySelector(".header");
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }

      lastScrollY = currentScrollY;
    });
  }
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initMobileMenu();
  initBackToTop();
  initSmoothScroll();
  initScrollAnimations();
});
