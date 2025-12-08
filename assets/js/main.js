// main.js — navbar, loader, small UI helpers
function toggleMenu(){
  const n = document.getElementById('mobileNav');
  if(!n) return;
  n.style.display = (n.style.display === 'flex') ? 'none' : 'flex';
}
window.addEventListener('load', ()=> {
  const loader = document.getElementById('loader');
  if(loader) setTimeout(()=> loader.style.display = 'none', 500);
});

// small helper to bind home delivery inputs (called from index.html)
function bindDeliveryElements(opts){
  if(!opts) return;
  const {inputId, checkBtnId, geoBtnId, resultId, waButtonId} = opts;
  const input = document.getElementById(inputId);
  const checkBtn = document.getElementById(checkBtnId);
  const geoBtn = document.getElementById(geoBtnId);
  const result = document.getElementById(resultId);
  if(checkBtn) checkBtn.addEventListener('click', ()=> {
    checkByAreaName(input ? input.value : '');
  });
  if(input) input.addEventListener('keydown', e=> { if(e.key==='Enter') checkByAreaName(input.value); });
  if(geoBtn) geoBtn.addEventListener('click', ()=> checkByGeolocation());
}
