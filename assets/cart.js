let cart = [];

export function addToCart(item, price) {
    cart.push({ item, price });
}

export function getCartTotal() {
    return cart.reduce((sum, x) => sum + x.price, 0);
}

export function getCartText() {
    return cart.map(x => `${x.item} - ₹${x.price}`).join("\n");
}

export function clearCart() {
    cart = [];
}

