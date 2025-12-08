window.getGPS = function (callback) {
    if (!navigator.geolocation) {
        callback(null);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => {
            callback({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            });
        },
        () => callback(null),
        { enableHighAccuracy: true }
    );
};
