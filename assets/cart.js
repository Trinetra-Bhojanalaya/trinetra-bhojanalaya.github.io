/* ---------------------------------------
   CART SYSTEM — WORKS ON ALL PAGES
----------------------------------------*/

let cart = JSON.parse(localStorage.getItem("cartData") || "[]");

/* Save cart to storage */
function saveCart() {
    localStorage.setItem("cartData", JSON.stringify(cart));
}

/* Add item to cart */
window.addToCart = function (name, price) {
    let item = cart.find(x => x.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    updateCartCount();
};

/* Update cart icon count */
function updateCartCount() {
    const count = cart.reduce((sum, x) => sum + x.qty, 0);
    const bubble = document.getElementById("cart-count");
    if (bubble) bubble.innerText = count;
}

/* Return saved cart */
window.getSavedCart = function () {
    return JSON.parse(localStorage.getItem("cartData") || "[]");
};

/* CLEAR CART when needed */
window.clearCart = function () {
    cart = [];
    saveCart();
    updateCartCount();
};

/* Load count on every page */
updateCartCount();
