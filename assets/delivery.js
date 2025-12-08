const SHOP_LAT = 13.017788;
const SHOP_LON = 77.713867;

let userLat = null;
let userLon = null;

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

function getGPS() {
    document.getElementById("gpsStatus").textContent = "Fetching location…";

    navigator.geolocation.getCurrentPosition(pos => {
        userLat = pos.coords.latitude;
        userLon = pos.coords.longitude;

        let dist = haversine(SHOP_LAT, SHOP_LON, userLat, userLon);

        let note = document.getElementById("deliveryNote");

        if (dist <= 1.5) {
            note.innerHTML = `<b>Delivery Available:</b> You are inside our service area.`;
        } 
        else if (dist <= 3) {
            note.innerHTML = `<b>Extended Delivery:</b> Delivery available with ₹20 charge.`;
        } 
        else {
            note.innerHTML = `<b>Not Delivering:</b> We currently cannot deliver to this location.`;
        }

        document.getElementById("gpsStatus").textContent = "Location detected ✔";

    }, err => {
        document.getElementById("gpsStatus").textContent = "Location error. Please allow GPS.";
    });
}

async function sendToWhatsApp() {
    let name = document.getElementById("custName").value.trim();
    let order = document.getElementById("orderItems").value.trim();
    let type = document.getElementById("orderType").value;
    let address = document.getElementById("deliveryAddress").value.trim();

    if (!name || !order) { alert("Enter name and order"); return; }

    if (type === "delivery" && (!userLat || !userLon)) {
        alert("Please click 'Use Current Location' first.");
        return;
    }

    let msg =
`*New Order – Trinetra Bhojanalaya*
👤 Name: ${name}
🛒 Order: ${order}
📦 Type: ${type}
📍 Address: ${type === "delivery" ? address : "Takeaway"}

Thank you!`;

    // Save logs in Firebase
    saveOrder(name, order, type, address, userLat, userLon);

    let url = "https://wa.me/918496004096?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
}

