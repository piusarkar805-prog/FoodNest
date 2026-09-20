// ================= CART =================

let cart = [];


// ADD TO CART
function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    showMessage(`${name} added to cart 🛒`);
}


// UPDATE CART COUNT
function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    document.getElementById("cart-count").textContent = totalItems;
}


// ================= MESSAGE =================

function showMessage(message) {

    const oldMessage = document.querySelector(".success-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const messageBox = document.createElement("div");

    messageBox.className = "success-message";
    messageBox.textContent = message;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 2000);
}


// ================= CART BUTTON =================

document.querySelector(".cart-btn").addEventListener("click", function () {

    if (cart.length === 0) {

        showMessage("Your cart is empty 🛒");

        return;
    }

    let cartText = "Cart Items:\n\n";

    cart.forEach(item => {

        cartText +=
            `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;

    });

    let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartText += `\nTotal: ₹${total}`;

    alert(cartText);
});


// ================= WISHLIST =================

document.querySelector(".wishlist-btn").addEventListener("click", function () {

    showMessage("Wishlist feature coming soon ❤️");

});


// ================= SEARCH =================

document.querySelector(".search-btn").addEventListener("click", function () {

    showMessage("Search feature coming soon 🔍");

});
// ================= CART MODAL =================

const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");


// OPEN CART
document.querySelector(".cart-btn").addEventListener("click", function () {
    renderCart();
    cartOverlay.classList.add("active");
});


// CLOSE CART
closeCart.addEventListener("click", function () {
    cartOverlay.classList.remove("active");
});


// CLICK OUTSIDE CART
cartOverlay.addEventListener("click", function (event) {

    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("active");
    }

});


// SHOW CART ITEMS
function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartEmpty.style.display = "block";
        cartItems.style.display = "none";
        cartTotal.textContent = "₹0";

        return;
    }

    cartEmpty.style.display = "none";
    cartItems.style.display = "block";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `

            <div class="cart-item-icon">
                🍽️
            </div>

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

            </div>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})">
                🗑️
            </button>

        `;

        cartItems.appendChild(itemElement);

    });

    cartTotal.textContent = `₹${total}`;
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();
    renderCart();

}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCartCount();
    renderCart();

}


// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    updateCartCount();
    renderCart();

    showMessage("Item removed from cart");

}


// CHECKOUT BUTTON
document.getElementById("checkout-btn").addEventListener("click", function () {

    if (cart.length === 0) {

        showMessage("Your cart is empty 🛒");
        return;

    }

    showMessage("Checkout page coming next! 🍕");

});
// ================= CHECKOUT =================

const checkoutOverlay = document.getElementById("checkout-overlay");
const closeCheckout = document.getElementById("close-checkout");
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotalPrice = document.getElementById("checkout-total-price");


// OPEN CHECKOUT
document.getElementById("checkout-btn").addEventListener("click", function () {

    if (cart.length === 0) {
        showMessage("Your cart is empty 🛒");
        return;
    }

    renderCheckout();

    cartOverlay.classList.remove("active");
    checkoutOverlay.classList.add("active");

});


// CLOSE CHECKOUT
closeCheckout.addEventListener("click", function () {

    checkoutOverlay.classList.remove("active");

});


// RENDER CHECKOUT
function renderCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const element = document.createElement("div");

        element.className = "checkout-item";

        element.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                ₹${itemTotal}
            </strong>
        `;

        checkoutItems.appendChild(element);

    });

    checkoutTotalPrice.textContent = `₹${total}`;

}


// ================= PLACE ORDER =================

document.getElementById("place-order").addEventListener("click", function () {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (name === "" || phone === "" || address === "") {

        showMessage("Please fill all delivery details ⚠️");

        return;
    }

    checkoutOverlay.classList.remove("active");

    document.getElementById("success-overlay").classList.add("active");

    cart = [];

    updateCartCount();

});


// CONTINUE SHOPPING

document.getElementById("continue-shopping").addEventListener("click", function () {

    document.getElementById("success-overlay").classList.remove("active");

    document.getElementById("customer-name").value = "";
    document.getElementById("customer-phone").value = "";
    document.getElementById("customer-address").value = "";

});

// FINAL ADD TO CART FIX
document.querySelectorAll(".food-card").forEach(function(card) {

    const buttons = card.querySelectorAll("button");

    buttons.forEach(function(button) {

        if (button.textContent.toLowerCase().includes("cart")) {

            button.onclick = function(event) {
                event.preventDefault();
                event.stopPropagation();

                const nameElement = card.querySelector("h3");
                const priceElement = card.querySelector(".food-bottom strong");

                if (!nameElement || !priceElement) return;

                const name = nameElement.textContent.trim();
                const price = Number(
                    priceElement.textContent.replace("₹", "").trim()
                );

                const existing = cart.find(function(item) {
                    return item.name === name;
                });

                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push({
                        name: name,
                        price: price,
                        quantity: 1
                    });
                }

                updateCartCount();
                showMessage(name + " added to cart 🛒");
            };
        }
    });
});
// FINAL ADD BUTTON FIX
document.querySelectorAll(".food-card").forEach(function(card) {

    const buttons = card.querySelectorAll("button");

    buttons.forEach(function(button) {

        if (button.textContent.trim().toLowerCase() === "add") {

            button.onclick = function(event) {
                event.preventDefault();
                event.stopPropagation();

                const nameElement = card.querySelector("h3");
                const priceElement = card.querySelector(".food-bottom strong");

                if (!nameElement || !priceElement) return;

                const name = nameElement.textContent.trim();
                const price = Number(
                    priceElement.textContent.replace("₹", "").trim()
                );

                const existingItem = cart.find(function(item) {
                    return item.name === name;
                });

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        name: name,
                        price: price,
                        quantity: 1
                    });
                }

                updateCartCount();
                showMessage(name + " added to cart 🛒");
            };
        }
    });
});
// FOODNEST CART FINAL FIX
document.addEventListener("click", function(event) {

    const button = event.target.closest(".food-card button");

    if (!button) return;

    // Heart/Wishlist button হলে বাদ
    if (
        button.classList.contains("food-heart") ||
        button.textContent.includes("♡") ||
        button.textContent.includes("♥")
    ) {
        return;
    }

    const card = button.closest(".food-card");

    if (!card) return;

    const nameElement = card.querySelector("h3");
    const priceElement = card.querySelector("strong");

    if (!nameElement || !priceElement) return;

    const name = nameElement.textContent.trim();

    const price = parseInt(
        priceElement.textContent.replace(/[^\d]/g, "")
    );

    if (!name || !price) {
        showMessage("Food details not found ⚠️");
        return;
    }

    // Existing item check
    const existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();

    showMessage(name + " added to cart 🛒");
});
// ===== FOODNEST FINAL CART SYSTEM =====

window.cart = window.cart || [];

window.addToCart = function(name, price) {

    let existingItem = window.cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        window.cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    // Cart count update
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        let total = 0;

        window.cart.forEach(function(item) {
            total += item.quantity;
        });

        cartCount.textContent = total;
    }

    // Success message
    if (typeof showMessage === "function") {
        showMessage(name + " added to cart 🛒");
    } else {
        alert(name + " added to cart 🛒");
    }

    console.log("FoodNest Cart:", window.cart);
};
cart = window.cart;