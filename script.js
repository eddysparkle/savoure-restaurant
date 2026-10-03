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














// =========================
// QUANTITY → ORDER SUMMARY
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

// =========================
// ORDER FORM + CONFIRMATION
// =========================
const orderForm = document.getElementById("order-form");

if (orderForm) {
  const orderSection = document.getElementById("order-section");
  const confirmation = document.getElementById("order-confirmation");
  const submitBtn = orderForm.querySelector("button[type='submit']");
  const addressField = document.getElementById("address-field");
  const addressInput = document.getElementById("address");
  const orderTypeRadios = orderForm.querySelectorAll("input[name='order-type']");

  function toggleAddress() {
    const selected = orderForm.querySelector("input[name='order-type']:checked");
    if (!addressField || !selected) return;

    if (selected.value === "pickup") {
      addressField.style.display = "none";
      if (addressInput) addressInput.required = false;
    } else {
      addressField.style.display = "block";
      if (addressInput) addressInput.required = true;
    }
  }

  orderTypeRadios.forEach(function (radio) {
    radio.addEventListener("change", toggleAddress);
  });
  toggleAddress();

  orderForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (submitBtn) {
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch(orderForm.action, {
        method: "POST",
        body: new FormData(orderForm),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        if (orderSection) orderSection.style.display = "none";
        if (confirmation) {
          confirmation.style.display = "block";
          confirmation.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        if (submitBtn) {
          submitBtn.textContent = "Failed – Try Again";
          submitBtn.disabled = false;
        }
      }
    } catch (error) {
      if (submitBtn) {
        submitBtn.textContent = "Error – Try Again";
        submitBtn.disabled = false;
      }
    }
  });
}









