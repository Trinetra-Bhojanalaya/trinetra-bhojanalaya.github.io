/* Mobile Menu Toggle */
export function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("show");
}

/* Smooth Scroll (if needed later) */
export function smoothScroll(id) {
    document.querySelector(id).scrollIntoView({
        behavior: "smooth"
    });
}

/* Show temporary toast notifications */
export function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

