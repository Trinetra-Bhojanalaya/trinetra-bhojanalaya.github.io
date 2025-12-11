/* ================================
   SLIDING MENU (RIGHT SIDE PANEL)
   ================================ */

function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    // Toggle open/close
    if (sideMenu.classList.contains("menu-open")) {
        closeMenu();
    } else {
        sideMenu.classList.add("menu-open");
        overlay.classList.add("overlay-active");
    }
}

function closeMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    sideMenu.classList.remove("menu-open");
    overlay.classList.remove("overlay-active");
}

/* ================================
   CLOSE MENU WHEN CLICKING OUTSIDE
   ================================ */

document.addEventListener("click", function (event) {
    const sideMenu = document.getElementById("sideMenu");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.getElementById("overlay");

    // If menu is open & click is outside menu & hamburger
    if (
        sideMenu.classList.contains("menu-open") &&
        !sideMenu.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        closeMenu();
    }
});

/* ================================
   CLOSE MENU ON SCROLL
   ================================ */

window.addEventListener("scroll", function () {
    const sideMenu = document.getElementById("sideMenu");

    if (sideMenu.classList.contains("menu-open")) {
        closeMenu();
    }
});

/* ================================
   LOADER
   ================================ */

window.onload = function () {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 500);
};
