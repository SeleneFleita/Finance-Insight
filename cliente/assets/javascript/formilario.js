var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

function validacionBanco() {
    var razonSocial = document.getElementById("usu-banco").value.trim();
    var email = document.getElementById('mail-banco').value.trim();
    var cuil = document.getElementById('cuil-banco').value.trim();
    var password = document.getElementById('pass-banco').value;
    var confirmPassword = document.getElementById('confirm-pass-banco').value;

    //Validar todos lo campos obligatoriamente
    if (razonSocial === '' || email === '' || cuil === '' || password === '' || confirmPassword === '') {
        alert('Por favor completa todos los campos.');
        return false;
    }

    // Validación de la razón social (mínimo 4 caracteres)
    if (razonSocial.length < 4) {
        alert('La razón social debe tener al menos 4 caracteres.');
        return false;
    }

    // Validación de las contraseñas (deben ser iguales)
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Validación del CUIL (debe tener exactamente 11 dígitos)
    if (cuil.length !== 11 || isNaN(cuil)) {
        alert('El CUIL debe tener exactamente 11 dígitos numéricos.');
        return false;
    }

    // Validación del formato de email utilizando una expresión regular
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('El formato del email no es válido.');
        return false;
    }

    // Si todas las validaciones son exitosas, se puede enviar el formulario
    alert('Formulario validado correctamente. Se puede enviar.');
    return true;
}

function validarRegistro() {
    var nombreApellido = document.getElementById('nombreap-cliente').value.trim();
    var fechaNacimiento = document.getElementById('fechanac-cliente').value.trim();
    var dni = document.getElementById('dni-cliente').value.trim();
    var email = document.getElementById('mail-cliente').value.trim();
    var contraseña = document.getElementById('contracli-cliente').value;
    var confirmarContraseña = document.getElementById('confconcli-cliente').value;

    // Validación de campos vacíos
    if (nombreApellido === '' || fechaNacimiento === '' || dni === '' || email === '' || contraseña === '' || confirmarContraseña === '') {
        alert('Por favor completa todos los campos.');
        return false;
    }

    // Validación de nombre y apellido (mínimo 8 caracteres)
    if (nombreApellido.length < 8) {
        alert('El nombre y apellido deben tener al menos 8 caracteres.');
        return false;
    }

    // Validación de DNI (exactamente 8 caracteres numéricos)
    if (dni.length !== 8 || isNaN(dni)) {
        alert('El DNI debe tener exactamente 8 dígitos numéricos.');
        return false;
    }

    // Validación del formato de email utilizando una expresión regular
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('El formato del email no es válido.');
        return false;
    }

    // Validación de las contraseñas (deben ser iguales)
    if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Si todas las validaciones son exitosas, se puede enviar el formulario
    alert('Formulario validado correctamente. Se puede enviar.');
    return true;
}
