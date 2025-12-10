// === FORM VALIDATIONS ===
const forms = document.querySelectorAll("form[id^='contactForm']");

function clearErrors() {
  document.querySelectorAll(".error-message").forEach(el => el.remove());
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
}

function showError(input, message) {
  input.classList.add("error");

  const error = document.createElement("p");
  error.classList.add("error-message");
  error.textContent = message;

  input.parentNode.appendChild(error);
}

function validateForm(form) {
  clearErrors();
  let isValid = true;

  const nombre = form.querySelector("#nombre");
  const email = form.querySelector("#email");
  const telefono = form.querySelector("#telefono");
  const mensaje = form.querySelector("#mensaje");

  // Nombre
  if (nombre.value.trim().length < 3) {
    showError(nombre, "El nombre debe tener al menos 3 caracteres.");
    isValid = false;
  }

  // Email
  if (!email.value.includes("@") || !email.value.includes(".")) {
    showError(email, "Ingrese un correo electrónico válido.");
    isValid = false;
  }

  // Teléfono argentino simple
  const regexTelefono = /^\d{2}[- ]?\d{4}[- ]?\d{4}$/;
  if (!regexTelefono.test(telefono.value.trim())) {
    showError(telefono, "Formato de teléfono inválido. Ej: 11-1234-5678");
    isValid = false;
  }

  // Mensaje (opcional, pero si existe mínimo 5 caracteres)
  if (mensaje.value.trim().length > 0 && mensaje.value.trim().length < 5) {
    showError(mensaje, "El mensaje debe tener al menos 5 caracteres.");
    isValid = false;
  }

  return isValid;
}

// === FORM SUBMIT ===
forms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Gracias por contactarte. Te responderemos a la brevedad.",
        });

        form.reset();
        clearErrors();

      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al enviar el formulario. Intenta nuevamente.",
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Revisa tu conexión a internet.",
      });
    }
  });
});
