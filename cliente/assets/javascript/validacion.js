const btnEnviar = document.getElementById('btn-enviar');

function validacionBanco(e) {
    e.preventDefault();
    const nombreDeUsuario = document.getElementById('usu-banco');
    const direccionEmail = document.getElementById('mail-banco');
    const errorUsuario = document.getElementById('error-usuario');
    const errorEmail = document.getElementById('error-email');
    
    // Limpiar mensajes de error
    errorUsuario.textContent = "";
    errorEmail.textContent = "";

    let esValido = true;
    
    if (nombreDeUsuario.value.trim() === "") {
        errorUsuario.textContent = "Por favor, escribe tu nombre de usuario.";
        nombreDeUsuario.focus();
        esValido = false;
    }
    
    if (direccionEmail.value.trim() === "") {
        errorEmail.textContent = "Por favor, escribe tu correo electrónico.";
        direccionEmail.focus();
        esValido = false;
    } else if (!emailValido(direccionEmail.value.trim())) {
        errorEmail.textContent = "Por favor, escribe un correo electrónico válido.";
        direccionEmail.focus();
        esValido = false;
    }
    
    return esValido; // Se pueden enviar los datos del formulario al servidor si esValido es true
}

const emailValido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

btnEnviar.addEventListener('click', validacionBanco);