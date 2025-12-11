// PRICE LIST
const prices = {
    chole: 40,
    puri: 20,
    aloo: 30,
    gobi: 40,
    pav: 45
};

let cart = {
    chole: 0,
    puri: 0,
    aloo: 0,
    gobi: 0,
    pav: 0
};

// UPDATE UI
function updateUI(item) {
    document.getElementById(`qty-${item}`).textContent = cart[item];
    updateCartDrawer();
}

// Increase qty
function increase(item) {
    cart[item]++;
    updateUI(item);
}

// Decrease qty
function decrease(item) {
    if (cart[item] > 0) cart[item]--;
    updateUI(item);
}

// Open cart drawer
function openCart() {
    document.getElementById("cartDrawer").style.bottom = "0";
    document.getElementById("overlay").classList.add("overlay-active");
}

// Close cart drawer
function closeCart() {
    document.getElementById("cartDrawer").style.bottom = "-100%";
    document.getElementById("overlay").classList.remove("overlay-active");
}

// Close cart on outside click
document.addEventListener("click", function (e) {
    const drawer = document.getElementById("cartDrawer");
    const cartBtn = document.querySelector(".cart-btn");

    const clickedInsideDrawer = drawer.contains(e.target);
    const clickedCartButton = e.target.closest(".cart-btn");

    if (!clickedInsideDrawer && !clickedCartButton) {
        closeCart();
    }
});

// Clear cart
function clearCart() {
    for (let item in cart) {
        cart[item] = 0;
        document.getElementById(`qty-${item}`).textContent = 0;
    }
    updateCartDrawer();
}

// Update drawer content
function updateCartDrawer() {
    const cartItemsDiv = document.getElementById("cartItems");
    cartItemsDiv.innerHTML = "";

    let total = 0;

    for (let item in cart) {
        if (cart[item] > 0) {
            let subtotal = cart[item] * prices[item];
            total += subtotal;

            cartItemsDiv.innerHTML += `
                <div class="cart-row">
                    <span class="item-label">${item.toUpperCase()} × ${cart[item]}</span>
                    <span class="price">₹${subtotal}</span>
                </div>
            `;
        }
    }

    document.getElementById("cartTotal").textContent = `₹${total}`;
}

// WhatsApp checkout
function proceedOrder() {
    let msg = "Hello, I want to order:\n\n";
    let total = 0;

    for (let item in cart) {
        if (cart[item] > 0) {
            let subtotal = cart[item] * prices[item];
            total += subtotal;
            msg += `${item.toUpperCase()} × ${cart[item]} = ₹${subtotal}\n`;
        }
    }

    msg += `\nTotal = ₹${total}`;

    window.location.href =
        `https://wa.me/918496004096?text=${encodeURIComponent(msg)}`;
}
