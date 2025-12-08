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
