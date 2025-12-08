/* Shop Coordinates */
const SHOP_LAT = 13.017788;
const SHOP_LON = 77.713867;

let userLat = null;
let userLon = null;

/* Haversine Distance */
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat/2)**2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2)**2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

/* Fetch GPS */
function getGPS() {
    const gpsStatus = document.getElementById("gpsStatus");
    const note = document.getElementById("deliveryNote");

    gpsStatus.textContent = "Fetching your location…";

    navigator.geolocation.getCurrentPosition(pos => {
        userLat = pos.coords.latitude;
        userLon = pos.coords.longitude;

        let d = haversine(SHOP_LAT, SHOP_LON, userLat, userLon);

        if (d <= 1.5) {
            note.innerHTML = "<b>Delivery Available:</b> You are within 1.5 km.";
        }
        else if (d <= 3) {
            note.innerHTML = "<b>Extended Delivery:</b> ₹20 delivery charge applies.";
        }
        else {
            note.innerHTML = "<b>Out of Range:</b> We cannot deliver here.";
        }

        gpsStatus.textContent = "Location detected ✔";

    }, err => {
        gpsStatus.textContent = "Location permission denied.";
    });
}

/* WhatsApp Routing */
function sendToWhatsApp() {
    let name = document.getElementById("custName").value.trim();
    let order = document.getElementById("orderItems").value.trim();
    let type = document.getElementById("orderType").value;
    let address = document.getElementById("deliveryAddress").value.trim();

    if (!name || !order) {
        alert("Please enter name and order.");
        return;
    }

    if (type === "delivery" && (!userLat || !userLon)) {
        alert("Please get your GPS location first.");
        return;
    }

    /* WhatsApp Message */
    let msg = 
`*New Order – Trinetra Bhojanalaya*
👤 Name: ${name}
🛒 Order: ${order}
📦 Type: ${type}
📍 Address: ${type === "delivery" ? address : "Takeaway"}
`;

    /* Save order in Firestore (hidden from user) */
    saveOrder(name, order, type, address, userLat, userLon);

    let url = "https://wa.me/918496004096?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}
