// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const primaryNav = document.getElementById("primaryNav");

// Close mobile menu when clicking on a nav item
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (primaryNav.classList.contains("active")) {
      primaryNav.classList.remove("active");
      mobileMenuToggle.innerHTML = `
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            `;
    }
  });
});

// Get Started button functionality
const getStartedBtn = document.getElementById("getStartedBtn");
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    // Redirect to signup or show modal
    alert("Get Started functionality - redirect to signup page");
  });
}

// Enhanced Module Page Features
class ModulePage {
  constructor() {
    this.courses = [];
    this.favorites = JSON.parse(
      localStorage.getItem("favoriteCourses") || "[]"
    );
    this.currentFilters = {
      search: "",
      category: "",
      priceRange: 1500,
      sortBy: "default",
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadCourses();
    this.setupScrollToTop();
    this.setupAnimations();
    this.loadFavorites();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.currentFilters.search = e.target.value.toLowerCase();
        this.filterAndSortCourses();
      });
    }

    // Category filter
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
      categoryFilter.addEventListener("change", (e) => {
        this.currentFilters.category = e.target.value;
        this.filterAndSortCourses();
      });
    }

    // Sort functionality
    const sortBy = document.getElementById("sortBy");
    if (sortBy) {
      sortBy.addEventListener("change", (e) => {
        this.currentFilters.sortBy = e.target.value;
        this.filterAndSortCourses();
      });
    }

    // Price range slider
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    if (priceRange && priceValue) {
      priceRange.addEventListener("input", (e) => {
        this.currentFilters.priceRange = parseInt(e.target.value);
        priceValue.textContent = e.target.value;
        this.filterAndSortCourses();
      });
    }

    // Clear filters
    const clearFilters = document.getElementById("clearFilters");
    if (clearFilters) {
      clearFilters.addEventListener("click", () => {
        this.clearAllFilters();
      });
    }

    // Course card click handlers
    this.setupCourseCardHandlers();

    // Modal handlers
    this.setupModalHandlers();
  }

  loadCourses() {
    const courseCards = document.querySelectorAll(".course-card");
    this.courses = Array.from(courseCards).map((card) => {
      const name = card.dataset.name || card.querySelector("h3").textContent;
      const category = card.dataset.category || "";
      const price = parseInt(card.dataset.price) || 0;
      const chapters = parseInt(card.dataset.chapters) || 0;
      const description = card.querySelector(".course-description").textContent;

      return {
        element: card,
        name: name,
        category: category,
        price: price,
        chapters: chapters,
        description: description,
        isVisible: true,
      };
    });
  }

  filterAndSortCourses() {
    let filteredCourses = this.courses.filter((course) => {
      // Search filter
      if (
        this.currentFilters.search &&
        !course.name.toLowerCase().includes(this.currentFilters.search)
      ) {
        return false;
      }

      // Category filter
      if (
        this.currentFilters.category &&
        course.category !== this.currentFilters.category
      ) {
        return false;
      }

      // Price filter
      if (course.price > this.currentFilters.priceRange) {
        return false;
      }

      return true;
    });

    // Sort courses
    filteredCourses = this.sortCourses(filteredCourses);

    // Update visibility
    this.courses.forEach((course) => {
      const isVisible = filteredCourses.includes(course);
      course.element.style.display = isVisible ? "block" : "none";
      course.isVisible = isVisible;
    });

    // Trigger animations for visible courses
    this.animateVisibleCourses();
  }

  sortCourses(courses) {
    switch (this.currentFilters.sortBy) {
      case "price-low":
        return courses.sort((a, b) => a.price - b.price);
      case "price-high":
        return courses.sort((a, b) => b.price - a.price);
      case "chapters-low":
        return courses.sort((a, b) => a.chapters - b.chapters);
      case "chapters-high":
        return courses.sort((a, b) => b.chapters - a.chapters);
      case "name":
        return courses.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return courses;
    }
  }

  clearAllFilters() {
    // Reset form elements
    document.getElementById("searchInput").value = "";
    document.getElementById("categoryFilter").value = "";
    document.getElementById("sortBy").value = "default";
    document.getElementById("priceRange").value = "1500";
    document.getElementById("priceValue").textContent = "1500";

    // Reset filters
    this.currentFilters = {
      search: "",
      category: "",
      priceRange: 1500,
      sortBy: "default",
    };

    this.filterAndSortCourses();
  }

  setupCourseCardHandlers() {
    document.addEventListener("click", (e) => {
      // Handle "See Details" button clicks
      if (
        e.target.classList.contains("btn-primary") &&
        e.target.textContent.includes("See Details")
      ) {
        const courseCard = e.target.closest(".course-card");
        this.showCourseModal(courseCard);
      }

      // Handle "Access Course" button clicks
      if (e.target.classList.contains("btn-success")) {
        const courseCard = e.target.closest(".course-card");
        this.enrollCourse(courseCard);
      }
    });
  }

  showCourseModal(courseCard) {
    const modal = document.getElementById("courseModal");
    const courseName = courseCard.querySelector("h3").textContent;
    const courseDescription = courseCard.querySelector(
      ".course-description"
    ).textContent;
    const coursePrice = courseCard.querySelector(".course-price").textContent;
    const courseChapters =
      courseCard.querySelector(".course-info span").textContent;
    const courseCategory =
      courseCard.querySelector(".category-tag")?.textContent || "General";

    // Populate modal
    document.getElementById("modalTitle").textContent = courseName;
    document.getElementById("modalDescription").textContent = courseDescription;
    document.getElementById("modalPrice").textContent = coursePrice;
    document.getElementById("modalChapters").textContent = courseChapters;
    document.getElementById("modalCategory").textContent = courseCategory;

    // Generate features list
    const features = this.generateCourseFeatures(courseName);
    const featuresList = document.getElementById("modalFeatures");
    featuresList.innerHTML = features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    // Show modal
    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    // Setup modal event handlers
    this.setupModalEventHandlers(courseCard);
  }

  generateCourseFeatures(courseName) {
    const featureMap = {
      "Front End Engineering": [
        "HTML5 and CSS3 fundamentals",
        "JavaScript ES6+ features",
        "Responsive web design",
        "Modern frameworks (React, Vue)",
        "Build tools and deployment",
      ],
      "Core Java Programming": [
        "Object-oriented programming concepts",
        "Java syntax and data types",
        "Exception handling",
        "Collections framework",
        "Multithreading and concurrency",
      ],
      "React Development": [
        "Component-based architecture",
        "State management with hooks",
        "Routing and navigation",
        "API integration",
        "Testing and deployment",
      ],
      "Python Programming": [
        "Python syntax and fundamentals",
        "Data structures and algorithms",
        "Object-oriented programming",
        "Web development with Django/Flask",
        "Data science libraries",
      ],
      Calculus: [
        "Limits and continuity",
        "Derivatives and applications",
        "Integration techniques",
        "Differential equations",
        "Multivariable calculus",
      ],
    };

    return (
      featureMap[courseName] || [
        "Comprehensive course materials",
        "Hands-on projects",
        "Expert instructor guidance",
        "Certificate of completion",
        "Lifetime access to resources",
      ]
    );
  }

  setupModalEventHandlers(courseCard) {
    const modal = document.getElementById("courseModal");
    const closeBtn = document.getElementById("closeModal");
    const addToFavorites = document.getElementById("addToFavorites");
    const enrollCourse = document.getElementById("enrollCourse");

    // Close modal
    const closeModal = () => {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Add to favorites
    addToFavorites.addEventListener("click", () => {
      this.toggleFavorite(courseCard);
      this.updateFavoriteButton(courseCard);
    });

    // Enroll course
    enrollCourse.addEventListener("click", () => {
      this.enrollCourse(courseCard);
      closeModal();
    });
  }

  toggleFavorite(courseCard) {
    const courseName = courseCard.querySelector("h3").textContent;
    const index = this.favorites.indexOf(courseName);

    if (index > -1) {
      this.favorites.splice(index, 1);
      courseCard.classList.remove("favorite");
    } else {
      this.favorites.push(courseName);
      courseCard.classList.add("favorite");
    }

    localStorage.setItem("favoriteCourses", JSON.stringify(this.favorites));
  }

  updateFavoriteButton(courseCard) {
    const courseName = courseCard.querySelector("h3").textContent;
    const addToFavorites = document.getElementById("addToFavorites");

    if (this.favorites.includes(courseName)) {
      addToFavorites.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        Remove from Favorites
      `;
    } else {
      addToFavorites.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        Add to Favorites
      `;
    }
  }

  loadFavorites() {
    this.favorites.forEach((courseName) => {
      const courseCard = Array.from(
        document.querySelectorAll(".course-card")
      ).find((card) => card.querySelector("h3").textContent === courseName);
      if (courseCard) {
        courseCard.classList.add("favorite");
      }
    });
  }

  enrollCourse(courseCard) {
    const courseName = courseCard.querySelector("h3").textContent;
    alert(
      `Enrolling in: ${courseName}\n\nThis would redirect to the enrollment page.`
    );
  }

  setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTop");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  setupAnimations() {
    // Add animate class to all visible course cards initially
    document.querySelectorAll(".course-card").forEach((card) => {
      card.classList.add("animate");
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all course cards
    document.querySelectorAll(".course-card").forEach((card) => {
      observer.observe(card);
    });
  }

  animateVisibleCourses() {
    // Add animate class to all visible courses
    document.querySelectorAll(".course-card").forEach((card) => {
      if (card.style.display !== "none") {
        card.classList.add("animate");
      }
    });
  }
}

// Initialize the module page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ModulePage();
});
