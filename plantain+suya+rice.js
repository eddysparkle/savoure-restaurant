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
