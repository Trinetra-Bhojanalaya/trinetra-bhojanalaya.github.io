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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;

/* Firestore Order Saver */
window.saveOrder = async function (orderData) {
    try {
        await addDoc(collection(db, "orders"), {
            ...orderData,
            timestamp: serverTimestamp()
        });
    } catch (err) {
        console.error("ORDER SAVE FAILED:", err);
    }
};
