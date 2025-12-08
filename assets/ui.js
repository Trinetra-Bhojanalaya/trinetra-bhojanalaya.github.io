/* Mobile Menu Toggle */
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("show");
};

/* Smooth Scroll (Optional) */
window.smoothScroll = function (id) {
    document.querySelector(id).scrollIntoView({
        behavior: "smooth"
    });
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
    document.getElementById("cartDrawer").classList.add("show");
};

window.closeCart = function () {
    document.getElementById("cartDrawer").classList.remove("show");
};
