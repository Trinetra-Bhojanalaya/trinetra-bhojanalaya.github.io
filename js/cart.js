const prices = { chole: 80, pav: 90, aloo: 60, gobi: 80, puri: 60 };
let cart = { chole: 0, pav: 0, aloo: 0, gobi: 0, puri: 0 };
const itemNames = {
    chole: "Chole Bhature", pav: "Pav Bhaji",
    aloo: "Aloo Paratha", gobi: "Gobi Paratha", puri: "Puri Chole"
};

function updateUI(item) {
    const qtySpan = document.getElementById(`qty-${item}`);
    const actionDiv = document.getElementById(`action-${item}`);
    const btnAdd = actionDiv.querySelector('.btn-add');
    const qtyBox = actionDiv.querySelector('.qty-box');

    if (cart[item] > 0) {
        btnAdd.style.display = 'none';
        qtyBox.style.display = 'flex';
        qtySpan.textContent = cart[item];
    } else {
        btnAdd.style.display = 'inline-flex';
        qtyBox.style.display = 'none';
    }
    
    updateCartDrawer();
    updateDockIndicator();
}

function increase(item) { cart[item]++; updateUI(item); }
function decrease(item) { if (cart[item] > 0) { cart[item]--; updateUI(item); } }

function openCart() {
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("overlay").classList.add("overlay-active");
}

function closeCart() {
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("overlay").classList.remove("overlay-active");
}

document.getElementById("overlay").addEventListener("click", closeCart);

function clearCart() {
    for (let item in cart) {
        cart[item] = 0;
        updateUI(item);
    }
}

function updateCartDrawer() {
    const cartItemsDiv = document.getElementById("cartItems");
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
    
    document.getElementById("cartTotal").textContent = `₹${total}`;
}

function updateDockIndicator() {
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    const dockText = document.querySelector('.dock-order .text');
    if (count > 0) {
        dockText.textContent = `View Cart (${count})`;
    } else {
        dockText.textContent = `Order Now`;
    }
}

function proceedOrder() {
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    if(count === 0) {
       alert("Please add items to your cart first.");
       return;
    }

    let msg = "Hello Trinetra Bhojanalaya! I'd like to order:\n\n";
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

// Initial hydration
updateCartDrawer();
