const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}


// GOOGLE SHEETS SETUP: paste your deployed Google Apps Script Web App URL here.
// Until you configure this URL, the form will show a setup message and will not submit.
const GOOGLE_SHEETS_WEB_APP_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.getElementById("registrationStatus");
    const submitButton = document.getElementById("registrationSubmit");

    if (!GOOGLE_SHEETS_WEB_APP_URL.startsWith("https://script.google.com/macros/s/")) {
      status.textContent = "Registration is not connected yet. The organiser must add the Google Sheets Web App URL in script.js.";
      status.className = "registration-status error";
      return;
    }

    const formData = new FormData(registrationForm);
    const registration = Object.fromEntries(formData.entries());
    registration.eventName = "INNOVATE FEST 2K26";
    registration.submittedAt = new Date().toISOString();

    submitButton.disabled = true;
    submitButton.textContent = "Submitting…";
    status.textContent = "Sending your registration…";
    status.className = "registration-status";

    try {
      // text/plain avoids a browser preflight request with Google Apps Script.
      await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(registration)
      });
      // In no-cors mode the browser cannot read Google's response. This message means
      // the request was sent; the organiser should verify the row appears in the Sheet.
      status.textContent = "Registration submitted. Please keep your payment reference. If you need confirmation, contact the event team.";
      status.className = "registration-status success";
      registrationForm.reset();
    } catch (error) {
      status.textContent = "Could not send the registration. Check your internet connection and try again.";
      status.className = "registration-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit Registration <span>→</span>';
    }
  });
}
