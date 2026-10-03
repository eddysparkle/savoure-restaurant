// =========================
// MOBILE MENU (Homepage only)
// =========================
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
    });
  });
}

// =========================
// CONTACT FORM (Homepage only)
// =========================
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");

if (contactForm && submitButton) {
  contactForm.addEventListener("submit", async function (event) {
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

        setTimeout(function () {
          submitButton.textContent = "Send Message";
          submitButton.disabled = false;
        }, 3000);
      } else {
        submitButton.textContent = "Failed to Send";
        setTimeout(function () {
          submitButton.textContent = "Send Message";
          submitButton.disabled = false;
        }, 3000);
      }
    } catch (error) {
      submitButton.textContent = "Error. Try Again";
      setTimeout(function () {
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
      }, 3000);
    }
  });
}

// =========================
// MENU CARD ANIMATION (Homepage only)
// =========================
const menuCards = document.querySelectorAll(".menu-card");

if (menuCards.length > 0) {
  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-visible");
      }
    });
  });

  menuCards.forEach(function (card) {
    cardObserver.observe(card);
  });
}












// =========================
// QUANTITY → ORDER SUMMARY (Dish pages)
// =========================
const quantityInput = document.getElementById("quantity");
const summaryText = document.getElementById("summary-text");
const summaryTotal = document.getElementById("summary-total");

if (quantityInput && summaryText && summaryTotal) {
  const dishTitle = document.querySelector("main section:first-child h2");
  const priceElement = document.querySelector("main section:first-child h3");

  if (dishTitle && priceElement) {
    const dishName = dishTitle.textContent.trim();
    const basePrice = parseFloat(priceElement.textContent.replace("$", "").trim());

    function updateSummary() {
      const qty = parseInt(quantityInput.value) || 1;
      const total = basePrice * qty;

      summaryText.textContent = dishName + " × " + qty;
      summaryTotal.textContent = "Total: $" + total;
    }

    updateSummary();
    quantityInput.addEventListener("input", updateSummary);
    quantityInput.addEventListener("change", updateSummary);
  }
}








