/* ================================
   SEND ORDER TO WHATSAPP
   ================================ */

function sendOrder() {
    let dish = document.getElementById("dish").value;
    let qty = document.getElementById("qty").value;
    let mode = document.getElementById("mode").value;
    let address = document.getElementById("address").value;

    let msg = `Hello, I want to order:\n${dish} × ${qty}\nMode: ${mode}`;

    if (mode === "Home Delivery") {
        msg += `\nAddress: ${address}`;
    }

    // Updated WhatsApp number
    window.location.href =
        `https://wa.me/918496004096?text=${encodeURIComponent(msg)}`;
}
