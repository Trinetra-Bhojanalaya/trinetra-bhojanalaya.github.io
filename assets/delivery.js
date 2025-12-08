const SHOP_LAT = 13.017788;
const SHOP_LON = 77.713867;

let userLat = null;
let userLon = null;
let deliveryCharge = 0;

/* Distance Formula */
function dist(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI/180;
    const dLon = (lon2 - lon1) * Math.PI/180;
    const a = Math.sin(dLat/2)**2 +
              Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*
              Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/* Use GPS */
window.useGPS = function () {
    let status = document.getElementById("gpsStatus");
    let note = document.getElementById("deliveryNote");

    status.textContent = "Fetching location…";

    getGPS(loc => {
        if (!loc) {
            status.textContent = "GPS Permission Denied";
            return;
        }

        userLat = loc.lat;
        userLon = loc.lon;

        let d = dist(SHOP_LAT, SHOP_LON, userLat, userLon);

        if (d <= 1.5) {
            deliveryCharge = 0;
            note.textContent = "Inside delivery range (Free Delivery)";
        } else if (d <= 3) {
            deliveryCharge = 20;
            note.textContent = "Extended Delivery (₹20 charge)";
        } else {
            deliveryCharge = 9999;
            note.textContent = "Out of Delivery Range!";
        }

        status.textContent = "Location Found ✔";
    });
};

/* Place Order → WhatsApp */
window.sendToWhatsApp = function () {
    let name = document.getElementById("custName").value.trim();
    let type = document.getElementById("orderType").value;
    let address = document.getElementById("deliveryAddress").value.trim();

    let cart = getSavedCart();
    if (cart.length === 0) return alert("Your cart is empty.");
    if (name === "") return alert("Enter your name.");

    if (type === "delivery") {
        if (!userLat || !userLon)
            return alert("Use My Current Location before ordering.");
        if (deliveryCharge === 9999)
            return alert("We cannot deliver to your location.");
    }

    let subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    let total = subtotal + (type === "delivery" ? deliveryCharge : 0);

    let cartText = cart.map(i =>
        `${i.name} x${i.qty} = ₹${i.qty * i.price}`
    ).join("\n");

    let msg =
`*New Order – Trinetra Bhojanalaya*
👤 Name: ${name}

🛒 Order:
${cartText}

📦 Type: ${type}
🏠 Address: ${type === "delivery" ? address : "Takeaway"}

🚚 Delivery Charge: ₹${type === "delivery" ? deliveryCharge : 0}
💰 Total: ₹${total}
`;

    /* SAVE TO FIREBASE */
    saveOrder({
        name,
        cart,
        type,
        address,
        gpsLat: userLat,
        gpsLon: userLon,
        subtotal,
        deliveryCharge,
        total
    });

    /* SEND TO WHATSAPP */
    window.open(
        "https://wa.me/918496004096?text=" + encodeURIComponent(msg),
        "_blank"
    );

    clearCart();
};
