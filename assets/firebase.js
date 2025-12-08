import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC-O5KrfAIWl5A0A8ytzMs97VG9VQSGSjE",
    authDomain: "trinetra-bhojanalaya.firebaseapp.com",
    projectId: "trinetra-bhojanalaya",
    storageBucket: "trinetra-bhojanalaya.appspot.com",
    messagingSenderId: "706369975338",
    appId: "1:706369975338:web:17e8e85f6abc533b28ff53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Make Firestore globally available */
window.db = db;

/* Save order without using 'export' */
window.saveOrder = async function(name, cart, type, address, lat, lon, subtotal, deliveryCharge, total) {
    try {
        await addDoc(collection(window.db, "orders"), {
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
};
