/* -------------------------------
   MOBILE MENU
--------------------------------*/
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("show");
};

/* -------------------------------
   CART DRAWER
--------------------------------*/
window.openCart = function () {
    document.getElementById("cartDrawer").classList.add("show");
};

window.closeCart = function () {
    document.getElementById("cartDrawer").classList.remove("show");
};
