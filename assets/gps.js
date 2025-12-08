window.askForGPS = function(callbackSuccess, callbackError) {
    if (!navigator.geolocation) {
        callbackError("GPS not supported on this device.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => {
            callbackSuccess({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            });
        },
        err => {
            callbackError("GPS permission denied.");
        },
        { enableHighAccuracy: true }
    );
};
