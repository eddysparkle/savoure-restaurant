// =========================
// MOBILE MENU
// =========================
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  function closeMenu() {
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    navMenu.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  // Toggle when hamburger is clicked
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // don't bubble to document

    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when a nav link is clicked
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  // Close when tapping anywhere outside the menu
  document.addEventListener("click", function (event) {
    if (!navMenu.classList.contains("open")) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      closeMenu();
    }
  });

  // Don't close when tapping inside the menu itself
  navMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

      

// =========================
// CONTACT FORM (homepage)
// =========================
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");

if (contactForm && submitButton) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // stops Formspree thank-you page

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        submitButton.textContent = "Message Sent!";
        contactForm.reset();

        // wipe message and re-enable button after 3 seconds
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
// MENU CARD ANIMATION (homepage)
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
// QUANTITY → ORDER SUMMARY (dish pages)
// =========================
const quantityInput = document.getElementById("quantity");
const summaryText = document.getElementById("summary-text");
const summaryTotal = document.getElementById("summary-total");

if (quantityInput && summaryText && summaryTotal) {
  const dishTitle = document.querySelector("main section:first-child h2");
  const priceElement = document.querySelector("main section:first-child h3");

  if (dishTitle && priceElement) {
    const dishName = dishTitle.textContent.trim();
    const basePrice = parseFloat(priceElement.textContent.replace("$", "").trim()) || 0;

    function updateSummary() {
      const qty = parseInt(quantityInput.value, 10) || 1;
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
// ORDER FORM + CONFIRMATION (dish pages)
// =========================
const orderForm = document.getElementById("order-form");

if (orderForm) {
  const orderSection = document.getElementById("order-section");
  const confirmation = document.getElementById("order-confirmation");
  const submitBtn = orderForm.querySelector('button[type="submit"]');
  const addressField = document.getElementById("address-field");
  const addressInput = document.getElementById("address");
  const orderTypeRadios = orderForm.querySelectorAll('input[name="order-type"]');

  function toggleAddress() {
    const selected = orderForm.querySelector('input[name="order-type"]:checked');
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
    event.preventDefault(); // stops Formspree thank-you page

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
      } else if (submitBtn) {
        submitBtn.textContent = "Failed – Try Again";
        submitBtn.disabled = false;
      }
    } catch (error) {
      if (submitBtn) {
        submitBtn.textContent = "Error – Try Again";
        submitBtn.disabled = false;
      }
    }
  });
}
