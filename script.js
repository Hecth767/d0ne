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

// Contacto (demo local). Podés reemplazar por tu endpoint o Formspree.
function handleContact(ev){
  ev.preventDefault();
  const form = ev.currentTarget;
  const status = form.querySelector('.form-status');
  const data = Object.fromEntries(new FormData(form).entries());

  // Validación simple
  if(!data.name || !data.email || !data.message){
    status.textContent = "Por favor completá todos los campos.";
    return false;
  }

  // Simulación de envío
  status.textContent = "Enviando…";
  setTimeout(() => {
    status.textContent = "¡Gracias! Te responderemos pronto.";
    form.reset();
  }, 900);

  // Si querés enviar de verdad, descomentá y ajustá:
  /*
  fetch('https://formspree.io/f/xxxxxx', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form)
  }).then(r => {
    status.textContent = r.ok ? "¡Gracias! Te responderemos pronto." : "Ups, hubo un error. Probá de nuevo.";
    if (r.ok) form.reset();
  }).catch(() => status.textContent = "Ups, hubo un error. Probá de nuevo.");
  */
  return false;
}
