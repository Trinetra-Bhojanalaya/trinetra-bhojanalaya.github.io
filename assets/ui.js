/* -------------------------------
   MOBILE MENU
--------------------------------*/
window.toggleMenu = function () {
    document.getElementById("mobileMenu").classList.toggle("show");
};

/* -------------------------------
   CART DRAWER FUNCTIONS
--------------------------------*/

/* OPEN */
window.openCart = function () {
    document.getElementById("cartDrawer").classList.add("show");
};

/* CLOSE */
window.closeCart = function () {
    document.getElementById("cartDrawer").classList.remove("show");
};

/* TOGGLE — main fix */
window.toggleCart = function () {
    let drawer = document.getElementById("cartDrawer");

    if (drawer.classList.contains("show")) {
        drawer.classList.remove("show");   // close
    } else {
        drawer.classList.add("show");      // open
    }
};
