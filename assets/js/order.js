// order.js — order page logic: validate delivery-only when Home Delivery selected
function toggleAddressFieldOrder(){
  const mode = document.getElementById('orderMode').value;
  const addr = document.getElementById('orderAddress');
  const label = document.getElementById('addressLabel');
  const msg = document.getElementById('orderMsg');
  if(mode === 'Home Delivery'){
    addr.style.display = 'block';
    label.style.display = 'block';
    msg.innerHTML = '';
  } else {
    addr.style.display = 'none';
    label.style.display = 'none';
    msg.innerHTML = '';
  }
}

function initOrderPage(cfg){
  if(!cfg) return;
  const orderNowBtn = document.getElementById(cfg.orderNowBtnId);
  const detectBtn = document.getElementById(cfg.detectBtnId);
  const dishId = document.getElementById(cfg.dishId);
  const qtyId = document.getElementById(cfg.qtyId);
  const modeId = document.getElementById(cfg.modeId);
  const addressId = document.getElementById(cfg.addressId);
  const addressLabel = document.getElementById(cfg.addressLabelId);
  const msgEl = document.getElementById(cfg.msgId);

  // set initial display
  toggleAddressFieldOrder();

  // order click
  orderNowBtn.addEventListener('click', ()=> {
    const dish = dishId.value;
    const qty = Number(qtyId.value) || 1;
    const mode = modeId.value;

    msgEl.innerHTML = '';

    if(mode === 'Takeaway'){
      // direct WA message
      const text = `Hello, I want to order:\n${dish} × ${qty}\nMode: Takeaway`;
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      return;
    }

    // Home Delivery: validate address input first
    const address = addressId.value.trim();
    if(address === ''){
      msgEl.innerHTML = 'Please enter your delivery address or use "Use Current Location".';
      return;
    }

    // try to match area list first
    checkByAreaName(address, msgEl, (deliverable, distance, coords)=>{
      if(deliverable){
        const text = `Hello, I want to order:\n${dish} × ${qty}\nMode: Home Delivery\nAddress: ${address}\nDistance: ${distance.toFixed(2)} km`;
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      } else {
        msgEl.innerHTML = `Sorry — your location appears outside our delivery radius (${distance===Infinity ? 'unknown' : distance.toFixed(2) + ' km'}). We currently deliver within ${RADIUS_KM} km of Medahalli. Please choose Takeaway or call +91 ${WHATSAPP_NUMBER.slice(-10)} for help.`;
      }
    });
  });

  // detect location button
  detectBtn.addEventListener('click', ()=>{
    msgEl.innerHTML = '';
    checkByGeolocation(msgEl, (deliverable, distance, coords)=>{
      if(deliverable){
        // fill address with "Near lat,lon" suggestion (user can edit before finalizing)
        addressId.value = `Near (${coords.lat.toFixed(5)}, ${coords.lon.toFixed(5)})`;
        msgEl.innerHTML = `You are within delivery range (${distance.toFixed(2)} km). Please confirm address and tap Order.`;
      } else {
        msgEl.innerHTML = `Sorry — your current location is ${distance===Infinity ? 'unknown' : distance.toFixed(2)+' km'} away and outside our delivery radius. Please choose Takeaway.`;
      }
    });
  });
}
