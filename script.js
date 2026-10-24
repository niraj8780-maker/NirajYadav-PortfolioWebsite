// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

// Reveal content as it enters the viewport, with a fallback for older browsers.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

// Update the footer year automatically.
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// The contact form uses mailto so it works on a static GitHub Pages website.
// Replace this example address with Niraj's actual email before publishing.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const contactEmail = "niraj.yadav@example.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (contactEmail.endsWith("@example.com")) {
      formStatus.textContent = "Setup needed: replace niraj.yadav@example.com in script.js and index.html with Niraj's real email.";
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    formStatus.textContent = "Opening your email application…";
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

// Placeholder links intentionally do not navigate until real URLs are added.
document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      const label = link.dataset.label || "This link";
      window.alert(`${label} is a placeholder. Add the correct URL in index.html before publishing.`);
    }
  });
});
