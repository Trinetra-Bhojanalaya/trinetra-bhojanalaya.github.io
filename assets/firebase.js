// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

export const firebaseConfig = {
    apiKey: "AIzaSyC-O5KrfAIWl5A0A8ytzMs97VG9VQSGSjE",
    authDomain: "trinetra-bhojanalaya.firebaseapp.com",
    projectId: "trinetra-bhojanalaya",
    storageBucket: "trinetra-bhojanalaya.firebasestorage.app",
    messagingSenderId: "706369975338",
    appId: "1:706369975338:web:17e8e85f6abc533b28ff53"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

