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







// SAVOURÉ SHOPPING CART
const savoureCart = [];

function addToSavoureCart(name, price) {
  const existingItem = savoureCart.find(
    item => item.name === name
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    savoureCart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  renderSavoureCart();
}

function renderSavoureCart() {
  const cartItems = document.getElementById("savoure-cart-items");
  const cartTotal = document.getElementById("savoure-cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  savoureCart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("div");
    row.className = "savoure-cart-item";

    const description = document.createElement("span");
    description.textContent =
      `${item.name} × ${item.quantity} — $${subtotal.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "−";
    removeButton.setAttribute("aria-label", `Remove one ${item.name}`);
    removeButton.addEventListener("click", () => {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        savoureCart.splice(index, 1);
      }

      renderSavoureCart();
    });

    row.append(description, removeButton);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}










// =========================
// SAVOURÉ WHATSAPP CHECKOUT
// =========================

function checkoutSavoureCart() {
  // Savouré's WhatsApp number, including Nigeria's country code.
  const WHATSAPP_NUMBER = "2349022812745";

  // Find the checkout button.
  const checkoutButton = document.getElementById("savoure-checkout");

  // Prevent checkout when the cart is empty.
  if (!savoureCart || savoureCart.length === 0) {
    alert("Your cart is empty! Please add a delicious meal first.");
    return;
  }

  // Calculate the total.
  let total = 0;

  let message = "✨ *SAVOURÉ — NEW ORDER* ✨\n";
  message += "━━━━━━━━━━━━━━━━━━\n\n";
  message += "Hello Savouré! I'd like to place an order.\n\n";
  message += "*MY ORDER:*\n";

  savoureCart.forEach(function (item, index) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    message +=
      `${index + 1}. ${item.name}\n` +
      `   Quantity: ${item.quantity}\n` +
      `   Price: $${item.price.toFixed(2)} each\n` +
      `   Subtotal: $${subtotal.toFixed(2)}\n\n`;
  });

  message += "━━━━━━━━━━━━━━━━━━\n";
  message += `*TOTAL: $${total.toFixed(2)}*\n\n`;
  message += "Please confirm availability and the next steps. Thank you! 💛";

  // Create the WhatsApp chat link.
  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  // Open WhatsApp in a new tab.
  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  // If the browser blocks the new tab, show a clickable fallback.
  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
}








