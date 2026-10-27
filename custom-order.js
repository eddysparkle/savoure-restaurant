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







// SAVOURÉ CART CHECKOUT
function checkoutSavoureCart() {
if (savoureCart.length === 0) {
alert("Your cart is empty. Please add a dish first.");
return;
}

// Replace this placeholder with the restaurant's real
// WhatsApp number, including country code, without + or spaces.
const restaurantWhatsApp = "REPLACE_WITH_REAL_NUMBER";

if (!/^\d{10,15}$/.test(restaurantWhatsApp)) {
alert("WhatsApp checkout is not configured yet. Please contact the restaurant.");
return;
}

let message = "Hello Savouré! I'd like to place an order:\n\n";
let total = 0;

savoureCart.forEach(item => {
const subtotal = item.price * item.quantity;
total += subtotal;

message += `${item.name} x ${item.quantity} — $${subtotal.toFixed(2)}\n`;

});

message += "\nTotal: $${total.toFixed(2)}";
message += "\n\nPlease confirm availability and delivery details.";

const whatsappURL =
"https://wa.me/" +
restaurantWhatsApp +
"?text=" +
encodeURIComponent(message);

window.open(whatsappURL, "_blank", "noopener,noreferrer");
}
