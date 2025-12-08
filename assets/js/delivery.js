// delivery.js — shared delivery radius functions
// CONFIG: update shop lat/lon and radius here
const SHOP_LAT = 13.019196890641295;
const SHOP_LON = 77.71240071440033;
const RADIUS_KM = 1.5;
const WHATSAPP_NUMBER = '917619126420';

// common area list
const AREAS = {
  "medahalli": {lat:13.0192, lon:77.7144},
  "k r puram": {lat:13.0239, lon:77.7251},
  "kr puram": {lat:13.0239, lon:77.7251},
  "kithaganuru": {lat:13.0156, lon:77.7128},
  "parvathi nagar": {lat:13.0188, lon:77.7146},
  "seegehalli": {lat:13.0250, lon:77.7200},
  "whitefield": {lat:12.9718, lon:77.7490},
  "brooke bond": {lat:13.028, lon:77.716}
};

// haversine
function haversineKm(lat1, lon1, lat2, lon2){
  const toRad = v=>v*Math.PI/180;
  const R = 6371;
  const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c;
}

// UI result helper
function showResultElement(el, deliverable, distanceKm){
  if(!el) return;
  if(deliverable){
    el.innerHTML = `<div style="color:#1b5e20;font-weight:700">Good news — we deliver to your area! (${distanceKm.toFixed(2)} km away)</div>`;
  } else {
    el.innerHTML = `<div style="color:#b71c1c;font-weight:700">Sorry — we do not deliver to your area. (${distanceKm.toFixed(2)} km away)</div>
      <div style="color:#555;margin-top:6px">You can still order for takeaway or pick-up. Call: <a href="tel:+91${WHATSAPP_NUMBER}">+91 ${WHATSAPP_NUMBER.slice(-10)}</a></div>`;
  }
}

// check by area name (used both on home & order page)
function checkByAreaName(name, resultEl, onResult){
  if(!resultEl) resultEl = null;
  if(!name || name.trim()===''){
    if(resultEl) resultEl.innerHTML = `<div style="color:#555">Please type your area or use "Use my location".</div>`;
    return;
  }
  const key = name.trim().toLowerCase();
  if(AREAS[key]){
    const a = AREAS[key];
    const d = haversineKm(SHOP_LAT, SHOP_LON, a.lat, a.lon);
    if(resultEl) showResultElement(resultEl, d<=RADIUS_KM, d);
    if(onResult) onResult(d<=RADIUS_KM, d);
    return;
  }
  for(const k of Object.keys(AREAS)){
    if(k.includes(key) || key.includes(k)){
      const a = AREAS[k];
      const d = haversineKm(SHOP_LAT, SHOP_LON, a.lat, a.lon);
      if(resultEl) showResultElement(resultEl, d<=RADIUS_KM, d);
      if(onResult) onResult(d<=RADIUS_KM, d);
      return;
    }
  }
  if(resultEl) resultEl.innerHTML = `<div style="color:#444">Area not recognized. Try "Use my location" or a nearby landmark (e.g., "K R Puram").</div>`;
  if(onResult) onResult(false, Infinity);
}

// geolocation
function checkByGeolocation(resultEl, onResult){
  if(!navigator.geolocation){
    if(resultEl) resultEl.innerHTML = `<div style="color:#b71c1c">Geolocation not supported on your device.</div>`;
    if(onResult) onResult(false, Infinity);
    return;
  }
  if(resultEl) resultEl.innerHTML = `<div style="color:#555">Checking your location… please allow location permission.</div>`;
  navigator.geolocation.getCurrentPosition(pos=>{
    const lat = pos.coords.latitude, lon = pos.coords.longitude;
    const d = haversineKm(SHOP_LAT, SHOP_LON, lat, lon);
    if(resultEl) showResultElement(resultEl, d<=RADIUS_KM, d);
    if(onResult) onResult(d<=RADIUS_KM, d, {lat,lon});
  }, err=>{
    if(resultEl) resultEl.innerHTML = `<div style="color:#b71c1c">Location permission denied or unavailable. Try typing area name.</div>`;
    if(onResult) onResult(false, Infinity);
  }, {enableHighAccuracy:true, timeout:10000});
}
