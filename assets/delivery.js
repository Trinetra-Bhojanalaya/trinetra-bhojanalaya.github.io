/* ---------------------------------------------------------
   SHOP Coordinates (Delivery Range System)
--------------------------------------------------------- */
const SHOP_LAT = 13.017788;
const SHOP_LON = 77.713867;

let userLat = null;
let userLon = null;
let deliveryCharge = 0;

/* ---------------------------------------------------------
   GET SAVED CART FROM LOCAL STORAGE
--------------------------------------------------------- */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cartData")) || [];
    } catch {
        return [];
    }
}

/* ---------------------------------------------------------
   HAVERSINE FORMULA (Distance in KM)
--------------------------------------------------------- */
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat/2)**2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2)**2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

/* ---------------------------------------------------------
   GET USER GPS LOCATION
--------------------------------------------------------- */
window.getGPS = function () {
    let status = document.getElementById("gpsStatus");
    let note = document.getElementById("deliveryNote");

    status.textContent = "Fetching your location…";

    navigator.geolocation.getCurrentPosition(
        pos => {
            userLat = pos.coords.latitude;
            userLon = pos.coords.longitude;

            let distance = haversine(SHOP_LAT, SHOP_LON, userLat, userLon);

            if (distance <= 1.5) {
                deliveryCharge = 0;
                note.innerHTML = `<b>Delivery Available:</b> Free delivery (within 1.5 km)`;
            }
            else if (distance <= 3) {
                deliveryCharge = 20;
                note.innerHTML = `<b>Extended Delivery:</b> Delivery charge: ₹20`;
            }
            else {
                deliveryCharge = 9999;
                note.innerHTML = `<b>Out of Range:</b> Delivery not available`;
            }

            status.textContent = "Location detected ✔";
        },
        err => {
            status.textContent = "Location permission denied.";
        },
        { enableHighAccuracy: true }
    );
};


/* ---------------------------------------------------------
   PROCEED TO WHATSAPP ORDER
--------------------------------------------------------- */
window.sendToWhatsApp = function () {

    let name = document.getElementById("custName").value.trim();
    let address = document.getElementById("deliveryAddress").value.trim();
    let orderType = document.getElementById("orderType").value;

    if (name === "") {
        alert("Please enter your name");
        return;
    }

    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    if (orderType === "delivery") {
        
        if (!userLat || !userLon) {
            alert("Please click 'Use My Current Location' before ordering.");
            return;
        }

        if (deliveryCharge === 9999) {
            alert("Sorry, we cannot deliver to your location.");
            return;
        }
    }

    let cartText = cart
        .map(item => `${item.name} x${item.qty} = ₹${item.qty * item.price}`)
        .join("\n");

    let subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
    let grandTotal = subtotal + (orderType === "delivery" ? deliveryCharge : 0);

    let msg =
`*New Order – Trinetra Bhojanalaya*
👤 Name: ${name}

🛒 *Order Details:*
${cartText}

📦 Order Type: ${orderType}
🏠 Address: ${orderType === "delivery" ? address : "Takeaway"}

🚚 Delivery Charge: ₹${orderType === "delivery" ? deliveryCharge : 0}
💰 Total Payable: ₹${grandTotal}

Thank you!`;

    saveOrder(
        name,
        cart,
        orderType,
        address,
        userLat,
        userLon,
        subtotal,
        deliveryCharge,
        grandTotal
    );

    window.open("https://wa.me/918496004096?text=" + encodeURIComponent(msg), "_blank");
};

/* ---------------------------------------------------------
   HANDLE VISIBILITY OF ADDRESS + GPS BUTTON
--------------------------------------------------------- */
window.handleOrderType = function () {
    let type = document.getElementById("orderType").value;

    if (type === "takeaway") {
        document.getElementById("addressBox").style.display = "none";
        document.getElementById("gpsBtn").style.display = "none";
        document.getElementById("deliveryNote").innerHTML = "";
    } else {
        document.getElementById("addressBox").style.display = "block";
        document.getElementById("gpsBtn").style.display = "block";
    }
};
