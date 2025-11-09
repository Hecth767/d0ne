// script.js — controla el envío del formulario
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('suggestionForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Enviando...';

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  // opción A: enviar a nuestro backend (recomendado)
  try {
    const res = await fetch('http://localhost:3000/send-suggestion', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    if (res.ok) {
      status.textContent = 'Gracias — tu sugerencia fue enviada.';
      form.reset();
    } else {
      const txt = await res.text();
      status.textContent = 'Error al enviar: ' + txt;
    }
  } catch (err) {
    // Si no tienes backend, mostramos alternativa cliente (mailto)
    status.innerHTML = 'No hay servidor activo. <a href="mailto:contacto@d0ne.com?subject=Sugerencia de ' 
      + encodeURIComponent(data.name) 
      + '&body=' + encodeURIComponent(data.message + '\n\nContacto: ' + data.email) 
      + '">Enviar por correo</a>';
  }
});
