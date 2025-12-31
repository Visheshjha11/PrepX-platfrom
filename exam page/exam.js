
(function () {
  "use strict";

  // --- Config you can tweak for viva ---
  const STORAGE_KEY = "prepx_exam_student_form";
  const REQUIRE_ACKNOWLEDGEMENT = true;
  const ALLOW_MULTIPLE_GROUPS = false;

  // --- Elements (match your HTML) ---
  const form = document.getElementById("studentForm");
  if (!form) return;

  const submitBtn =
    form.querySelector('button[type="submit"]') ||
    form.querySelector(".submit-button");

  const inputName = document.getElementById("name");
  const inputRoll = document.getElementById("rollNumber");
  const inputEmail = document.getElementById("email");

  const groupContainer = form.querySelector(".group-selection");
  const groupBoxes = Array.from(
    form.querySelectorAll('input[type="checkbox"][name="group"]')
  );

  // --- Inject acknowledgement if not present ---
  let acknowledge = form.querySelector("#acknowledge");
  let ackHint = null;
  if (REQUIRE_ACKNOWLEDGEMENT && !acknowledge) {
    const field = document.createElement("div");
    field.className = "form-field";
    field.innerHTML = `
      <label class="form-label" for="acknowledge" style="display:flex;align-items:center;gap:8px;">
        <input type="checkbox" id="acknowledge" class="ack-checkbox" />
        I have read and agree to the exam instructions.
      </label>
      <small class="ack-hint"></small>
    `;
    (submitBtn?.parentElement || form).insertAdjacentElement("beforebegin", field);
    acknowledge = field.querySelector("#acknowledge");
    ackHint = field.querySelector(".ack-hint");
  } else if (acknowledge) {
    ackHint = acknowledge.closest(".form-field")?.querySelector(".ack-hint");
  }
  if (ackHint) ackHint.classList.add("ack-error");

  // --- Inline error helpers (field-level) ---
  function ensureErrorSlot(container) {
    let slot = container.querySelector(".field-error");
    if (!slot) {
      slot = document.createElement("small");
      slot.className = "field-error";
      container.appendChild(slot);
    }
    return slot;
  }
  function showFieldError(inputEl, message) {
    const container = inputEl.closest(".form-field");
    if (!container) return;
    const slot = ensureErrorSlot(container);
    container.classList.add("error");
    slot.textContent = message || "";
  }
  function clearFieldError(inputEl) {
    const container = inputEl.closest(".form-field");
    if (!container) return;
    const slot = container.querySelector(".field-error");
    container.classList.remove("error");
    if (slot) slot.textContent = "";
  }
  function friendlyMessage(inputEl) {
    const v = inputEl.validity;
    if (v.valid) return "";
    if (v.valueMissing) {
      if (inputEl === inputName) return "Please enter your full name.";
      if (inputEl === inputRoll) return "Please enter your roll number.";
      if (inputEl === inputEmail) return "Please enter your email ID.";
      return "This field is required.";
    }
    if (v.typeMismatch && inputEl.type === "email") {
      return "Please enter a valid email address.";
    }
    if (v.patternMismatch && inputEl === inputEmail) {
      return "Use your official @chitkara.edu.in email ID.";
    }
    if (v.tooShort) return `Please enter at least ${inputEl.minLength} characters.`;
    if (v.tooLong) return `Please keep under ${inputEl.maxLength} characters.`;
    return inputEl.validationMessage || "Please check this field.";
  }
  function validateFieldAndRender(inputEl) {
    inputEl.setCustomValidity("");
    const msg = friendlyMessage(inputEl);
    if (msg) {
      inputEl.setCustomValidity(msg);
      showFieldError(inputEl, msg);
      return false;
    } else {
      clearFieldError(inputEl);
      return true;
    }
  }

  // --- Group validation (custom; HTML has no group-level validity) ---
  let groupError = groupContainer?.querySelector(".group-error");
  if (!groupError && groupContainer) {
    groupError = document.createElement("small");
    groupError.className = "group-error";
    groupContainer.appendChild(groupError);
  }
  function getSelectedGroups() {
    return groupBoxes.filter((b) => b.checked);
  }
  function enforceGroupRules(changed) {
    if (!ALLOW_MULTIPLE_GROUPS && changed?.checked) {
      groupBoxes.forEach((b) => {
        if (b !== changed) b.checked = false;
      });
    }
  }
  function validateGroup() {
    const n = getSelectedGroups().length;
    let ok = true;
    let msg = "";
    if (n === 0) {
      ok = false; msg = "Please select your group.";
    } else if (!ALLOW_MULTIPLE_GROUPS && n > 1) {
      ok = false; msg = "Select only one group.";
    }
    if (groupError) groupError.textContent = msg;
    if (groupBoxes[0]) groupBoxes[0].setCustomValidity(ok ? "" : msg);
    return ok;
  }

  // --- Acknowledgement validation ---
  function validateAck() {
    if (!REQUIRE_ACKNOWLEDGEMENT || !acknowledge) return true;
    const ok = acknowledge.checked;
    if (ackHint) ackHint.textContent = ok ? "" : "Please confirm you have read the instructions.";
    return ok;
  }

  // --- Button state ---
  function updateBeginState() {
    const fieldsOK = [inputName, inputRoll, inputEmail]
      .filter(Boolean)
      .every((el) => validateFieldAndRender(el));
    const groupOK = validateGroup();
    const ackOK = validateAck();
    const enable = fieldsOK && groupOK && ackOK && form.checkValidity();
    if (submitBtn) {
      submitBtn.disabled = !enable;
      submitBtn.setAttribute("aria-disabled", String(!enable));
    }
  }

  // --- Persistence ---
  function serialize() {
    return {
      name: inputName?.value ?? "",
      rollNumber: inputRoll?.value ?? "",
      email: inputEmail?.value ?? "",
      groups: getSelectedGroups().map((b) => b.value),
      _ack: acknowledge ? acknowledge.checked : true,
    };
  }
  function restore(data) {
    if (!data) return;
    if (inputName && typeof data.name === "string") inputName.value = data.name;
    if (inputRoll && typeof data.rollNumber === "string") inputRoll.value = data.rollNumber;
    if (inputEmail && typeof data.email === "string") inputEmail.value = data.email;
    if (Array.isArray(data.groups)) {
      groupBoxes.forEach((b) => (b.checked = data.groups.includes(b.value)));
    }
    if (acknowledge && typeof data._ack === "boolean") {
      acknowledge.checked = data._ack;
    }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize())); } catch {}
  }

  // --- beforeunload guard (until successful submit) ---
  let safeToLeave = false;
  window.addEventListener("beforeunload", (e) => {
    if (safeToLeave) return;
    const hasAny =
      (inputName?.value?.trim()?.length ?? 0) > 0 ||
      (inputRoll?.value?.trim()?.length ?? 0) > 0 ||
      (inputEmail?.value?.trim()?.length ?? 0) > 0 ||
      getSelectedGroups().length > 0 ||
      (acknowledge?.checked ?? false);
    if (hasAny) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // --- Restore + initial validate ---
  try { restore(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")); } catch {}
  // Run initial render so messages appear if fields are empty
  [inputName, inputRoll, inputEmail].forEach((el) => el && validateFieldAndRender(el));
  validateGroup();
  validateAck();
  updateBeginState();

  // --- Events: input, change, blur, submit ---
  form.addEventListener("input", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    if (t.matches(".form-input")) {
      validateFieldAndRender(t);
    }
    if (t.matches('input[type="checkbox"][name="group"]')) {
      enforceGroupRules(t);
      validateGroup();
    }
    save();
    updateBeginState();
  });

  groupBoxes.forEach((b) =>
    b.addEventListener("change", (e) => {
      enforceGroupRules(e.target);
      validateGroup();
      save();
      updateBeginState();
    })
  );

  acknowledge?.addEventListener("change", () => {
    validateAck();
    save();
    updateBeginState();
  });

  // Validate on blur so users see prompts after leaving a field
  form.addEventListener(
    "blur",
    (e) => {
      const t = e.target;
      if (t && t.matches?.(".form-input")) validateFieldAndRender(t);
    },
    true
  );

  function scrollFocus(el) {
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus?.({ preventScroll: true });
  }
  function focusFirstProblem() {
    // Prefer native :invalid if present
    const invalid = form.querySelector(":invalid");
    if (invalid) {
      scrollFocus(invalid);
      return;
    }
    // Else guide to group or ack if those are the blockers
    if (!validateGroup() && groupBoxes[0]) {
      scrollFocus(groupBoxes[0]);
      return;
    }
    if (!validateAck() && acknowledge) {
      scrollFocus(acknowledge);
    }
  }

  form.addEventListener("submit", (e) => {
    // Run our validations so inline prompts are visible
    [inputName, inputRoll, inputEmail].forEach((el) => el && validateFieldAndRender(el));
    const groupOK = validateGroup();
    const ackOK = validateAck();

    if (!form.checkValidity() || !groupOK || !ackOK) {
      e.preventDefault();
      form.reportValidity(); // native bubbles (in addition to inline text)
      focusFirstProblem();
      updateBeginState();
      return;
    }

    // All good: persist + allow natural submit
    save();
    safeToLeave = true;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-disabled", "true");
      submitBtn.textContent = "Starting…";
    }
  });
})();

