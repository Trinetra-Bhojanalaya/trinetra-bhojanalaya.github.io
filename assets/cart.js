/* ------------------------------
   CART SYSTEM (GLOBAL)
------------------------------ */

let cart = JSON.parse(localStorage.getItem("cartData") || "[]");

/* Save Cart */
function saveCart() {
    localStorage.setItem("cartData", JSON.stringify(cart));
}

/* Add to cart */
window.addToCart = function (name, price) {
    let item = cart.find(i => i.name === name);

    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });

    saveCart();
    updateCartUI();
};

/* Remove item */
window.removeFromCart = function (name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    updateCartUI();
};

/* Increase qty */
window.incQty = function (name) {
    let item = cart.find(i => i.name === name);
    item.qty++;
    saveCart();
    updateCartUI();
};

/* Decrease qty */
window.decQty = function (name) {
    let item = cart.find(i => i.name === name);
    if (item.qty > 1) item.qty--;
    else cart = cart.filter(i => i.name !== name);
    saveCart();
    updateCartUI();
};

/* Load saved cart */
window.getSavedCart = function () {
    return JSON.parse(localStorage.getItem("cartData") || "[]");
};

/* Clear cart */
window.clearCart = function () {
    cart = [];
    saveCart();
    updateCartUI();
};

/* Cart Counter Bubble */
function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    let c = document.getElementById("cart-count");
    if (c) c.textContent = count;
}

/* Render Cart Drawer UI */
window.updateCartUI = function () {
    updateCartCount();

    let box = document.getElementById("cartItems");
    let totalBox = document.getElementById("cartTotal");

    if (!box) return;

    if (cart.length === 0) {
        box.innerHTML = "<p>Your cart is empty.</p>";
        if (totalBox) totalBox.textContent = "0";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        let sub = item.qty * item.price;
        total += sub;

        html += `
        <div class="cart-row">
            <span>${item.name}</span>
            <div class="qty-box">
                <button onclick="decQty('${item.name}')">-</button>
                <span>${item.qty}</span>
                <button onclick="incQty('${item.name}')">+</button>
            </div>
            <span>₹${sub}</span>
        </div>`;
    });

    box.innerHTML = html;
    if (totalBox) totalBox.textContent = total;
};

updateCartUI();
