const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const body = document.body;
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const faqQuestions = document.querySelectorAll(".faq-question");
const contactForm = document.getElementById("contactForm");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });
}

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger?.classList.remove("open");
    mobileNav?.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const isOpen = question.classList.contains("open");

    faqQuestions.forEach((otherQuestion) => {
      otherQuestion.classList.remove("open");
      otherQuestion.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen && answer) {
      question.classList.add("open");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector(".submit-btn");

    if (!submitButton) {
      return;
    }

    submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent';
    submitButton.style.background = "#2d8f61";

    setTimeout(() => {
      submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Request Orientation';
      submitButton.style.background = "";
      contactForm.reset();
    }, 2500);
  });
}
