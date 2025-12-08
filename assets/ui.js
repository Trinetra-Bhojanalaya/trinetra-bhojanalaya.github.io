/* Mobile Menu Toggle */
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("show");
};

/* Toast Notification */
window.showToast = function (msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

/* CART DRAWER FUNCTIONS */
window.openCart = function () {
    const drawer = document.getElementById("cartDrawer");
    drawer.classList.add("show");
};

window.closeCart = function () {
    const drawer = document.getElementById("cartDrawer");
    drawer.classList.remove("show");
};

/* DEFAULT HIDE CART ON LOAD */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cartDrawer").classList.remove("show");
});
