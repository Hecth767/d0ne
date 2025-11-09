// Toggle nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Intersection Observer para animaciones "reveal"
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12, rootMargin: "0px 0px -40px 0px"});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Año dinámico en footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Contacto (demo local). Reemplaza por tu endpoint si quieres envío real.
function handleContact(ev){
  ev.preventDefault();
  const form = ev.currentTarget;
  const status = form.querySelector('.form-status');
  const data = Object.fromEntries(new FormData(form).entries());

  if(!data.name || !data.email || !data.message){
    status.textContent = "Por favor completá todos los campos.";
    return false;
  }

  status.textContent = "Enviando…";
  setTimeout(() => {
    status.textContent = "¡Gracias! Te responderemos pronto.";
    form.reset();
  }, 900);
  return false;
}

// Parallax sutil del fondo (no interfiere con nada existente)
const bg = document.querySelector('.bg-computer');
let ticking = false;
function onScroll(){
  if(!bg) return;
  if(!ticking){
    window.requestAnimationFrame(() => {
      const offset = window.scrollY * 0.04;
      bg.style.transform = `scale(1.03) translateY(${offset}px)`;
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, {passive:true});

// Ripple en botones (data-ripple o cualquier .btn)
function attachRipple(el){
  el.addEventListener('click', (e) => {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// Estilos del ripple (inyectados por JS)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn, .dock__btn { position: relative; overflow: hidden; }
  .ripple{
    position:absolute; border-radius:50%;
    background: rgba(255,255,255,.35);
    transform: scale(0); animation: ripple .6s ease-out forwards;
    pointer-events:none; opacity:.9;
  }
  @keyframes ripple{ to { transform: scale(2.5); opacity:0 } }
`;
document.head.appendChild(rippleStyle);

// Adjunta ripple a todos los botones
document.querySelectorAll('.btn, [data-ripple], .dock__btn').forEach(attachRipple);
