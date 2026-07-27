const prices = {};
const itemNames = {};
let cart = {};

if (typeof MENU_ITEMS !== 'undefined') {
    // Load cart from localStorage
    let savedCart = {};
    try {
        savedCart = JSON.parse(localStorage.getItem('tb_cart')) || {};
    } catch(e) {
        console.error("Error reading localStorage", e);
    }

    MENU_ITEMS.forEach(item => {
        prices[item.id] = item.price;
        itemNames[item.id] = item.name;
        cart[item.id] = typeof savedCart[item.id] === 'number' ? savedCart[item.id] : 0;
    });
}

function saveCart() {
    try {
        localStorage.setItem('tb_cart', JSON.stringify(cart));
    } catch(e) {
        console.error("Error writing localStorage", e);
    }
}

function updateUI(item) {
    const actionDivs = document.querySelectorAll(`.qty-action[data-item="${item}"]`);

    actionDivs.forEach(actionDiv => {
        const btnAdd = actionDiv.querySelector('.btn-add');
        const qtyBox = actionDiv.querySelector('.qty-box');
        const qtySpan = actionDiv.querySelector('.qty-span');

        if (btnAdd && qtyBox && qtySpan) {
            if (cart[item] > 0) {
                btnAdd.style.display = 'none';
                qtyBox.style.display = 'flex';
                qtySpan.textContent = cart[item];
            } else {
                btnAdd.style.display = 'inline-flex';
                qtyBox.style.display = 'none';
            }
        }
    });
    
    updateCartDrawer();
    updateDockIndicator();
    if (typeof renderOrderPage === 'function') {
        renderOrderPage();
    }
}

function increase(item) { 
    cart[item]++; 
    saveCart(); 
    updateUI(item); 
}

function decrease(item) { 
    if (cart[item] > 0) { 
        cart[item]--; 
        saveCart(); 
        updateUI(item); 
    } 
}

function openCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("overlay-active");
}

function closeCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("overlay-active");
}

const overlayEl = document.getElementById("overlay");
if (overlayEl) {
    overlayEl.addEventListener("click", closeCart);
}

function clearCart() {
    for (let item in cart) {
        cart[item] = 0;
    }
    saveCart();
    if (typeof MENU_ITEMS !== 'undefined') {
        MENU_ITEMS.forEach(item => updateUI(item.id));
    }
}

function updateCartDrawer() {
    const cartItemsDiv = document.getElementById("cartItems");
    if (!cartItemsDiv) return;
    
    cartItemsDiv.innerHTML = "";
    let total = 0;
    
    let hasItems = false;
    for (let item in cart) {
        if (cart[item] > 0) {
            hasItems = true;
            let subtotal = cart[item] * prices[item];
            total += subtotal;
            cartItemsDiv.innerHTML += `
                <div class="cart-row">
                    <span class="item-label">${itemNames[item]} <span style="color:#9CA3AF;font-size:14px;margin-left:8px;">× ${cart[item]}</span></span>
                    <span class="price">₹${subtotal}</span>
                </div>
            `;
        }
    }
    
    if (!hasItems) {
        cartItemsDiv.innerHTML = `<p style="color:#9CA3AF; text-align:center; margin-top: 40px;">Your cart is empty.</p>`;
    }
    
    const cartTotalVal = document.getElementById("cartTotal");
    if (cartTotalVal) {
        cartTotalVal.textContent = `₹${total}`;
    }
}

function updateDockIndicator() {
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    const dockText = document.querySelector('.dock-order .text');
    if (dockText) {
        if (count > 0) {
            dockText.textContent = `View Cart (${count})`;
        } else {
            dockText.textContent = `Order via WhatsApp`;
        }
    }
}

function handleDockClick(event) {
    if (event) event.preventDefault();
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    if (count > 0) {
        openCart();
    } else {
        window.open("https://wa.me/918496004096?text=Hello%20Trinetra%20Bhojanalaya%20I%20would%20like%20to%20order", "_blank");
    }
}

function proceedOrder() {
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    if(count === 0) {
       alert("Please add items to your cart first.");
       return;
    }

    let msg = "Hello Trinetra Bhojanalaya! I'd like to place a takeaway order:\n\n";
    let total = 0;
    
    for (let item in cart) {
        if (cart[item] > 0) {
            let subtotal = cart[item] * prices[item];
            total += subtotal;
            msg += `▪ ${itemNames[item]} × ${cart[item]} = ₹${subtotal}\n`;
        }
    }
    
    msg += `\n*Total = ₹${total}*\n\n(Takeaway Order)`;
    window.location.href = `https://wa.me/918496004096?text=${encodeURIComponent(msg)}`;
}

function syncCartUI() {
    if (typeof MENU_ITEMS !== 'undefined') {
        MENU_ITEMS.forEach(item => updateUI(item.id));
    }
}

// Hydrate UI once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    syncCartUI();
});

