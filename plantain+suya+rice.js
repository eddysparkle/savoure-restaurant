const itemPrice = 22;
const itemName = "Plantain & Prawns";

const quantityInput = document.getElementById("quantity");
const orderForm = document.querySelector("form");
const orderSummary = document.querySelector("form > div:last-of-type");
const orderTypeInputs = document.querySelectorAll('input[name="order-type"]');
const addressInput = document.getElementById("address");

// Update the order summary
function updateSummary() {
  let quantity = quantityInput.value;

  if (quantity === "") {
    quantity = 0;
  }

  quantity = Number(quantity);

  const total = itemPrice * quantity;

  orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    <p>${itemName} × ${quantity}</p>
    <p><strong>Total: $${total}</strong></p>
  `;
}

quantityInput.addEventListener("input", updateSummary);

// Delivery / Pickup
orderTypeInputs.forEach(function (input) {
  input.addEventListener("change", function () {
    if (input.value === "delivery" && input.checked) {
      addressInput.disabled = false;
      addressInput.required = true;
      addressInput.placeholder = "Enter your delivery address";
    }

    if (input.value === "pickup" && input.checked) {
      addressInput.disabled = true;
      addressInput.required = false;
      addressInput.value = "";
      addressInput.placeholder = "Address not required for pickup";
    }
  });
});

// Submit order
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const quantity = Number(quantityInput.value);
  const customerName =
    document.getElementById("customer-name").value;
  const customerPhone =
    document.getElementById("customer-phone").value;

  const selectedOrderType = document.querySelector(
    'input[name="order-type"]:checked'
  );

  const orderType = selectedOrderType.value;
  const total = itemPrice * quantity;

  orderForm.parentElement.style.display = "none";

  const confirmation = document.createElement("section");

  confirmation.id = "order-confirmation";

  confirmation.innerHTML = `
    <div class="confirmation-box">
      <div class="confirmation-icon">✓</div>

      <h2>Order Received</h2>

      <p class="confirmation-message">
        Thank you, ${customerName}! Your order has been received.
      </p>

      <div class="confirmation-details">
        <p><strong>Item:</strong> ${itemName}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Order Type:</strong> ${orderType}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
      </div>

      <p class="confirmation-note">
        Savouré will contact you to confirm the order details.
      </p>

      <button id="back-to-menu" type="button">
        Back to Menu
      </button>
    </div>
  `;

  document.querySelector("main").appendChild(confirmation);

  document
    .getElementById("back-to-menu")
    .addEventListener("click", function () {
      window.location.href = "index.html#menu";
    });
});

// Initial summary
updateSummary();



















// Update Order Summary when quantity changes
const quantityInput = document.getElementById("quantity");
const summaryText = document.querySelector("form > div:last-of-type p:first-of-type");
const totalText = document.querySelector("form > div:last-of-type p:last-of-type");

// Get the dish name and base price from the page
const dishName = document.querySelector("main section:first-child h2").textContent.trim();
const basePrice = parseFloat(document.querySelector("main section:first-child h3").textContent.replace("$", ""));

function updateSummary() {
  const qty = parseInt(quantityInput.value) || 1;
  const total = (basePrice * qty).toFixed(0);

  summaryText.textContent = `${dishName} × ${qty}`;
  totalText.textContent = `Total: $${total}`;
}

// Run once on page load
updateSummary();

// Update every time the user changes the quantity
quantityInput.addEventListener("input", updateSummary);


















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

if (quantityInput) {
  const summaryBox = document.querySelector("form > div:last-of-type");
  const summaryText = summaryBox ? summaryBox.querySelector("p:first-of-type") : null;
  const totalText = summaryBox ? summaryBox.querySelector("p:last-of-type") : null;

  const dishTitle = document.querySelector("main section:first-child h2");
  const priceElement = document.querySelector("main section:first-child h3");

  if (summaryText && totalText && dishTitle && priceElement) {
    const dishName = dishTitle.textContent.trim();
    const basePrice = parseFloat(priceElement.textContent.replace("$", "").trim());

    function updateSummary() {
      const qty = parseInt(quantityInput.value) || 1;
      const total = basePrice * qty;

      summaryText.textContent = `${dishName} × ${qty}`;
      totalText.textContent = `Total: $${total}`;
    }

    // Update immediately on page load
    updateSummary();

    // Update every time the user changes the quantity
    quantityInput.addEventListener("input", updateSummary);
  }
}

