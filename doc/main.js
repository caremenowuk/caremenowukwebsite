/* ============================================================
   CAREMENOW V2 — main.js
   Smooth UX • Secure-ready • Zero performance loss
   ============================================================ */

/* Smooth scroll */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* FAQ accordion */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".faq-item").classList.toggle("open");
  });
});

/* Form validation helper */
function validateForm(formId, fields) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorEl = document.querySelector(`[data-error-for="${field.id}"]`);
      if (!input || !errorEl) return;

      let value =
        input.type === "checkbox" ? input.checked : input.value.trim();
      let error = "";

      if (field.required && !value) error = "This field is required.";

      if (!error && field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = "Enter a valid email.";
      }

      if (!error && field.type === "tel") {
        const telRegex = /^[0-9+()\s-]{6,}$/;
        if (!telRegex.test(value)) error = "Enter a valid phone number.";
      }

      errorEl.textContent = error;
      if (error) valid = false;
    });

    if (valid) {
      const successEl =
        formId === "care-form"
          ? document.getElementById("care-success")
          : document.getElementById("job-success");

      if (successEl) successEl.style.display = "block";
      form.reset();
    }
  });
}

/* Apply validation */
validateForm("care-form", [
  { id: "care-name", required: true },
  { id: "care-phone", required: true, type: "tel" },
  { id: "care-email", required: true, type: "email" },
  { id: "care-postcode", required: true },
  { id: "care-for", required: true },
  { id: "care-type", required: true },
  { id: "care-when", required: true },
  { id: "care-message", required: true },
  { id: "care-consent", required: true },
]);

validateForm("job-form", [
  { id: "job-name", required: true },
  { id: "job-phone", required: true, type: "tel" },
  { id: "job-email", required: true, type: "email" },
  { id: "job-postcode", required: true },
  { id: "job-drive", required: true },
  { id: "job-experience", required: true },
  { id: "job-availability", required: true },
  { id: "job-message", required: true },
]);
