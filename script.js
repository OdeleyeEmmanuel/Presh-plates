const intro = document.getElementById('intro');
const site = document.getElementById('site');
const skip = document.getElementById('skipIntro');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

function openSite(){
  if(!intro) return;
  intro.classList.add('graceful');
  site.classList.add('ready');
  document.body.classList.add('intro-finished');
  setTimeout(()=>{ intro.remove(); }, 1100);
  try { sessionStorage.setItem('preshIntroSeen','1'); } catch(e){}
}

try {
  if(sessionStorage.getItem('preshIntroSeen') === '1'){
    intro.remove();
    site.classList.add('ready');
  } else {
    setTimeout(openSite, 60000);
  }
} catch(e) {
  setTimeout(openSite, 60000);
}
skip.addEventListener('click', openSite);

menuToggle.addEventListener('click', ()=>nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav nav a').forEach(a => a.addEventListener('click', ()=>nav.classList.remove('mobile-open')));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('orderForm').addEventListener('submit', e=>{
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const name = f.get('name');
  const phone = f.get('phone');
  const order = f.get('order');
  const quantity = f.get('quantity');
  const message = f.get('message') || 'No special request.';
  const text =
`Hello Presh's Plates Kitchen!

Name: ${name}
Phone: ${phone}
Order: ${order}
Quantity: ${quantity}
Message: ${message}

I'd like to place this order.`;
  window.open(`https://wa.me/2348154227732?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
