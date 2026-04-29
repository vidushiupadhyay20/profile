// DOM Elements (unchanged)
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section, #home");
const backToTop = document.getElementById("backToTop");
const copyBtn = document.getElementById("copyEmailBtn");
const typedElement = document.getElementById("typed");
const contactForm = document.getElementById("demoForm");
const barFills = document.querySelectorAll(".bar-fill");

// ---------- Theme Handling ----------
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  if (body.hasAttribute("data-theme")) {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

themeToggle.addEventListener("click", toggleTheme);
initTheme();

// ---------- Typing Animation (updated roles) ----------
const roles = [
  "Java Developer",
  "C Programmer",
  "Tech Enthusiast",
  "Problem Solver",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
      return;
    }
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 100);
}
typeEffect();

// ---------- Mobile Menu (unchanged) ----------
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

// ---------- Active Link on Scroll ----------
function setActiveLink() {
  let current = "";
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").substring(1);
    if (href === current) {
      link.classList.add("active");
    }
  });
}

// ---------- Scroll Reveal + Skill Bars ----------
const revealElements = document.querySelectorAll(
  ".project-card, .about-text, .stat-card, .skill-chip, .contact-card, .contact-form",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

const skillsSection = document.getElementById("skills");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        barFills.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          if (width) bar.style.width = width + "%";
        });
        barObserver.unobserve(skillsSection);
      }
    });
  },
  { threshold: 0.3 },
);
if (skillsSection) barObserver.observe(skillsSection);

// ---------- Back to Top ----------
window.addEventListener("scroll", () => {
  setActiveLink();
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Copy Email ----------
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const email = document.querySelector(
      '.contact-card a[href^="mailto"]',
    )?.innerText;
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = original;
        }, 2000);
      });
    }
  });
}

// ---------- Contact Form (Demo) ----------
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const msg = document.getElementById("formMsg").value.trim();
    if (!name || !email || !msg) {
      alert("Please fill all fields.");
      return;
    }
    const btn = contactForm.querySelector("button");
    const originalText = btn.innerHTML;
    btn.innerHTML = "Sending...";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2000);
      alert("Thank you! Your message has been sent. (Demo mode)");
    }, 1000);
  });
}

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, null, targetId);
    }
  });
});

// Close mobile menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    const icon = hamburger.querySelector("i");
    if (icon)
      (icon.classList.remove("fa-times"), icon.classList.add("fa-bars"));
  }
});

// Initial active link set
setActiveLink();