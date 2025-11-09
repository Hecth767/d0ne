// Animación de aparición suave al hacer scroll
const secciones = document.querySelectorAll('.seccion');

const mostrarSeccion = () => {
  const triggerBottom = window.innerHeight * 0.85;

  secciones.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', mostrarSeccion);
mostrarSeccion();
