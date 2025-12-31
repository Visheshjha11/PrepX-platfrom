(function () {
  const forms = {
    email: document.getElementById("emailForm"),
    signup: document.getElementById("signupForm"),
  };

  // Tab switching
  const authTabs = document.querySelectorAll(".auth-tab");
  const authCards = document.querySelectorAll(".auth-card");
  const authTitles = document.querySelectorAll("#authTitle, #signupTitle");
  const authSubtitles = document.querySelectorAll(".subtitle");

  // Validation helpers
  const validation = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: (password) =>
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password),
    name: (name) => name.trim().length >= 2,
  };

  // Error handling
  function showError(input, message) {
    const errorElement =
      input.parentElement.querySelector(".error-message") ||
      input.parentElement.querySelector(".invalid-feedback");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    } else {
      const div = document.createElement("div");
      div.className = "error-message";
      div.style.color = "#dc3545";
      div.style.fontSize = "0.875rem";
      div.style.marginTop = "0.25rem";
      div.textContent = message;
      input.parentElement.appendChild(div);
    }
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.style.display = "none";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  // Password show/hide toggle
  function setupPasswordVisibility() {
    document.querySelectorAll(".toggle-password").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const input = btn.parentElement.querySelector("input");
        const hidden = input.type === "password";
        input.type = hidden ? "text" : "password";
        btn.textContent = hidden ? "Hide" : "Show";
      });
    });
  }

  // Switch tabs
  function switchTab(tabName) {
    authTabs.forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.tab === tabName)
    );
    authCards.forEach((card) =>
      card.classList.toggle("hidden", card.id !== tabName + "Card")
    );
  }

  authTabs.forEach((tab) =>
    tab.addEventListener("click", () => switchTab(tab.dataset.tab))
  );
  document
    .querySelectorAll('[data-action="switch-to-signin"]')
    .forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab("signin");
      })
    );

  // --- LOCAL STORAGE BASED AUTH ---

  // Save user
  function saveUser(user) {
    const users = JSON.parse(localStorage.getItem("prepx:users") || "[]");
    users.push(user);
    localStorage.setItem("prepx:users", JSON.stringify(users));
  }

  // Find user
  function findUser(email) {
    const users = JSON.parse(localStorage.getItem("prepx:users") || "[]");
    return users.find((u) => u.email === email);
  }

  // --- SIGNUP HANDLER ---
  if (forms.signup) {
    forms.signup.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("signupConfirmPassword").value;

      let valid = true;
      if (!validation.name(name)) {
        showError(document.getElementById("signupName"), "Invalid name");
        valid = false;
      } else clearError(document.getElementById("signupName"));

      if (!validation.email(email)) {
        showError(document.getElementById("signupEmail"), "Invalid email");
        valid = false;
      } else clearError(document.getElementById("signupEmail"));

      if (!validation.password(password)) {
        showError(
          document.getElementById("signupPassword"),
          "Weak password (min 8 chars, upper/lower/number)"
        );
        valid = false;
      } else clearError(document.getElementById("signupPassword"));

      if (password !== confirm) {
        showError(
          document.getElementById("signupConfirmPassword"),
          "Passwords do not match"
        );
        valid = false;
      } else clearError(document.getElementById("signupConfirmPassword"));

      if (!valid) return;

      // Check duplicate
      if (findUser(email)) {
        alert("❌ Account already exists. Please sign in.");
        switchTab("signin");
        return;
      }

      // Save
      saveUser({ name, email, password });
      alert("✅ Account created! You can now sign in.");
      switchTab("signin");
    });
  }

  // --- LOGIN HANDLER ---
  if (forms.email) {
    forms.email.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const remember = document.getElementById("remember").checked;

      if (!validation.email(email)) {
        showError(document.getElementById("email"), "Invalid email");
        return;
      } else clearError(document.getElementById("email"));

      if (!password) {
        showError(document.getElementById("password"), "Enter password");
        return;
      } else clearError(document.getElementById("password"));

      const user = findUser(email);
      if (!user) {
        alert("❌ No account found. Please sign up first.");
        switchTab("signup");
        return;
      }

      if (user.password !== password) {
        alert("❌ Incorrect password.");
        return;
      }

      if (remember) localStorage.setItem("prepx:lastEmail", email);
      alert("✅ Welcome back, " + user.name + "! Redirecting...");
      window.location.href = "../landing/index.html#signed-in";
    });
  }

  // Restore remembered email
  function restoreRemembered() {
    const saved = localStorage.getItem("prepx:lastEmail");
    if (saved) {
      const input = document.getElementById("email");
      const checkbox = document.getElementById("remember");
      if (input) input.value = saved;
      if (checkbox) checkbox.checked = true;
    }
  }

  function init() {
    setupPasswordVisibility();
    restoreRemembered();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
