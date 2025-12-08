/* ---------------------------------------------------------
   FULL SWIGGY-STYLE CART ENGINE
--------------------------------------------------------- */

let cart = [];   // Array of {name, price, qty}

/* ---------------------------------------------------------
   ADD TO CART
--------------------------------------------------------- */
window.addToCart = function (itemName, itemPrice) {

    // Check if item already in cart
    let item = cart.find(x => x.name === itemName);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            qty: 1
        });
    }

    updateCartCount();
    renderCartItems();
    openCart();
};

/* ---------------------------------------------------------
   INCREASE QUANTITY
--------------------------------------------------------- */
window.incQty = function (index) {
    cart[index].qty++;
    renderCartItems();
    updateCartCount();
};

/* ---------------------------------------------------------
   DECREASE QUANTITY
--------------------------------------------------------- */
window.decQty = function (index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    renderCartItems();
    updateCartCount();
};

/* ---------------------------------------------------------
   CALCULATE CART TOTAL
--------------------------------------------------------- */
function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ---------------------------------------------------------
   UPDATE FLOATING CART COUNT
--------------------------------------------------------- */
function updateCartCount() {
    document.getElementById("cart-count").textContent =
        cart.reduce((s, x) => s + x.qty, 0);
}

/* ---------------------------------------------------------
   RENDER CART IN THE DRAWER
--------------------------------------------------------- */
window.renderCartItems = function () {
    let box = document.getElementById("cartItems");
    let totalBox = document.getElementById("cartTotal");

    box.innerHTML = "";

    cart.forEach((item, i) => {
        box.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>

                <div class="qty-box">
                    <button class="qty-btn" onclick="decQty(${i})">–</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="incQty(${i})">+</button>
                </div>

                <span>₹${item.price * item.qty}</span>
            </div>
        `;
    });

    totalBox.textContent = getTotal();
};

/* ---------------------------------------------------------
   OPEN / CLOSE CART DRAWER
--------------------------------------------------------- */
window.openCart = function () {
    document.getElementById("cartDrawer").classList.add("open");
};

window.closeCart = function () {
    document.getElementById("cartDrawer").classList.remove("open");
};

/* ---------------------------------------------------------
   PROCEED TO DELIVERY PAGE
--------------------------------------------------------- */
window.proceedToDelivery = function () {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Save cart to localStorage to use in order.html
    localStorage.setItem("cartData", JSON.stringify(cart));

    window.location.href = "order.html";
};

/* ---------------------------------------------------------
   GET CART (from order.html)
--------------------------------------------------------- */
window.getSavedCart = function () {
    try {
        return JSON.parse(localStorage.getItem("cartData")) || [];
    } catch {
        return [];
    }
};
