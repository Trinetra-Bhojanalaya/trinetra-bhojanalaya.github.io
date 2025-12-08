import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveOrder(name, cart, type, address, lat, lon, subtotal, deliveryCharge, total) {
    try {
        await addDoc(collection(db, "orders"), {
            name,
            cart,
            type,
            address,
            gpsLat: lat,
            gpsLon: lon,
            subtotal,
            deliveryCharge,
            total,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error("Error saving order:", err);
    }
}
