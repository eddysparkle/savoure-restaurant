const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");



menuButton.addEventListener("click", function() {
  navMenu.classList.toggle("open");
});


const navLinks = navMenu.querySelectorAll("a");


navLinks.forEach(function(link) {
  link.addEventListener("click", function() {
    navMenu.classList.remove("open");
  });
});


const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");

contactForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      submitButton.textContent = "Message Sent!";

      contactForm.reset();

      setTimeout(function() {
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
      }, 3000);

    } else {
      submitButton.textContent = "Failed to Send";

      setTimeout(function() {
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
      }, 3000);
    }

  } catch (error) {
    submitButton.textContent = "Error. Try Again";

    setTimeout(function() {
      submitButton.textContent = "Send Message";
      submitButton.disabled = false;
    }, 3000);
  }
});


const menuCards = document.querySelectorAll(".menu-card");

const cardObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {

    if (entry.isIntersecting) {
      entry.target.classList.add("card-visible");
    }

  });
});

menuCards.forEach(function(card) {
  cardObserver.observe(card);
});
