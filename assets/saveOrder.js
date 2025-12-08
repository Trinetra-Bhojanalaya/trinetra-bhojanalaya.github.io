import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function saveOrder(name, order, type, address, lat, lon) {
    try {
        await addDoc(collection(db, "orders"), {
            name,
            order,
            type,
            address,
            gpsLat: lat,
            gpsLon: lon,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error("Error saving order:", err);
    }
}

