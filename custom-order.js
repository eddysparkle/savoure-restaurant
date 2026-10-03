const orderForm = document.querySelector("form");

const orderTypeInputs = document.querySelectorAll(
  'input[name="order-type"]'
);

const addressInput = document.getElementById("address");

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
      addressInput.placeholder =
        "Address not required for pickup";
    }
  });
});


// Submit custom order
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const foodType = document.getElementById("food-type").value;
  const base = document.getElementById("base").value;
  const protein = document.getElementById("protein").value;
  const side = document.getElementById("side").value || "None";

  const spiceLevel = document.querySelector(
    'input[name="spice-level"]:checked'
  ).value;

  const quantity = document.getElementById("quantity").value;

  const customerName =
    document.getElementById("customer-name").value;

  const customerPhone =
    document.getElementById("customer-phone").value;

  const orderType = document.querySelector(
    'input[name="order-type"]:checked'
  ).value;

  const specialRequest =
    document.getElementById("special-request").value;

  const allergies =
    document.getElementById("allergies").value;

  // Hide the order form
  orderForm.parentElement.style.display = "none";

  // Create confirmation section
  const confirmation = document.createElement("section");

  confirmation.id = "order-confirmation";

  confirmation.innerHTML = `
    <div class="confirmation-box">

      <div class="confirmation-icon">✓</div>

      <h2>Custom Order Received</h2>

      <p class="confirmation-message">
        Thank you, ${customerName}! Your custom order
        has been received.
      </p>

      <div class="confirmation-details">

        <p>
          <strong>Food Type:</strong>
          ${foodType}
        </p>

        <p>
          <strong>Base:</strong>
          ${base}
        </p>

        <p>
          <strong>Protein:</strong>
          ${protein}
        </p>

        <p>
          <strong>Side:</strong>
          ${side}
        </p>

        <p>
          <strong>Spice Level:</strong>
          ${spiceLevel}
        </p>

        <p>
          <strong>Quantity:</strong>
          ${quantity}
        </p>

        <p>
          <strong>Order Type:</strong>
          ${orderType}
        </p>

        <p>
          <strong>Phone:</strong>
          ${customerPhone}
        </p>

        <p>
          <strong>Special Requests:</strong>
          ${specialRequest || "None"}
        </p>

        <p>
          <strong>Allergies / Dietary Notes:</strong>
          ${allergies || "None"}
        </p>

      </div>

      <div class="confirmation-price">
        <p>
          <strong>Price: To be confirmed</strong>
        </p>

        <p>
          Savouré will review your custom meal
          and contact you with the final price.
        </p>
      </div>

      <p class="confirmation-note">
        Thank you for choosing Savouré.
      </p>

      <button id="back-to-menu" type="button">
        Back to Menu
      </button>

    </div>
  `;

  document.querySelector("main").appendChild(confirmation);


  // Back to Menu
  document
    .getElementById("back-to-menu")
    .addEventListener("click", function () {
      window.location.href = "index.html#menu";
    });
});
