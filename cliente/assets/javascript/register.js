//desplazar
let a = document.getElementById("loginBtn");
let b = document.getElementById("registerBtn");
let x = document.getElementById("login");
let y = document.getElementById("register");

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

console.log("hola mundo");
//validar cliente
function validarCliente() {
// Valores del input
const nypcliente = document.getElementById("nombreap-cliente").value.trim();
const fechanac = document.getElementById("fechanac-cliente").value.trim();
const dni = document.getElementById("dni-cliente").value.trim();
const mail = document.getElementById("mail-cliente").value.trim();
const con = document.getElementById("contracli-cliente").value.trim();
const confir = document.getElementById("confconcli-cliente").value.trim();

// Errores
const errnypcliente = document.getElementById("error-nombreap-cliente");
const errfechanac = document.getElementById("error-fechanac-cliente");
const errdni = document.getElementById("error-dni-cliente");
const errmail = document.getElementById("error-mail-cliente");
const errcon = document.getElementById("error-contracli-cliente");
const errconfir = document.getElementById("error-confconcli-cliente");
const errorform = document.getElementById("error-form");

// Expresiones regulares para validar
const validar = {
nombreyapellido: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']+$/, // Nombre y apellido solo letras y espacios
mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Correo electrónico válido
};

// Validar nombre y apellido
if (!validar.nombreyapellido.test(nypcliente)) {
errnypcliente.textContent = "El nombre y apellido deben contener solo letras y espacios";
errnypcliente.classList.add("error-message");
}else{
errnypcliente.textContent = "";
errnypcliente.classList.remove("error-message");
}
//validar longitud
if (nypcliente.length < 8) {
errnypcliente.textContent = "El nombre y apellido deben tener al menos 8 caracteres";
errnypcliente.classList.add("error-message");
} else {
errnypcliente.textContent = "";
errnypcliente.classList.remove("error-message");
}

// Validar correo electrónico
if (!validar.mail.test(mail)) {
errmail.textContent = "Ingrese una dirección de correo válida (por ejemplo, usuario@dominio.com)";
errmail.classList.add("error-message");
} else {
errmail.textContent = "";
errmail.classList.remove("error-message");
}
// Validar fecha de nacimiento
const fechaActual = new Date();
const fechaNacimiento = new Date(fechanac);

if (isNaN(fechaNacimiento.getTime())) {
errfechanac.textContent = "Ingrese una fecha de nacimiento válida";
errfechanac.classList.add("error-message");
} else if (fechaNacimiento >= fechaActual) {
errfechanac.textContent = "La fecha de nacimiento no puede ser en el futuro";
errfechanac.classList.add("error-message");
} else {
errfechanac.textContent = "";
errfechanac.classList.remove("error-message");
}


// Validar DNI
if (isNaN(dni) || dni.length !== 8) {
errdni.textContent = "El DNI debe ser un número de 8 dígitos";
errdni.classList.add("error-message");
} else {
errdni.textContent = "";
errdni.classList.remove("error-message");
}
//validacion de contraseña
if (con.length < 6) {
errcon.textContent = "La contraseña debe tener al menos 6 caracteres";
errcon.classList.add("error-message");
} else{
errcon.textContent = "";
errcon.classList.remove("error-message");
}
//confirmar y contraseña sean iguales
if (con !== confir) {
errconfir.textContent = "Las contraseñas no coinciden";
errconfir.classList.add("error-message");
} else {
errcon.textContent = "";
errcon.classList.remove("error-message");
}
//todos los campos deben estar completos
if (nypcliente.trim() === "" || fechanac.trim() === "" || dni.trim() === "" || mail.trim() === "" || con.trim() === "" || confir.trim() === "") {
errorform.textContent = "Rellene todos los campos del formulario";
errorform.classList.add("error-message");
} else {
errorform.textContent = "";
errorform.classList.remove("error-message");
}
}

function validarBanco(){
    //valores ingresados por los input
const razonSocial = document.getElementById("usu-banco").value;
const email = document.getElementById("mail-banco").value;
const cuil = document.getElementById("cuil-banco").value;
const contra = document.getElementById("pass-banco").value;
const confir = document.getElementById("confirm-pass-banco").value;

//mensaje de error
const errrazonSocial = document.getElementById("error-razon-social");
const erremail = document.getElementById("error-email-banco");
const errcuil = document.getElementById("error-cuil-banco");
const errcontra = document.getElementById("error-pass-banco");
const errconfir = document.getElementById("error-confirm-pass-banco");
const errform = document.getElementById("error-form-banc");

const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Correo electrónico válido
    
//validaciones
//validar la longitud de la razon social
if (razonSocial.length < 4) {
    errrazonSocial.textContent = "La razon social deben tener al menos 4 caracteres";
    errrazonSocial.classList.add("error-message");
    } else {
    errrazonSocial.textContent = "";
    errrazonSocial.classList.remove("error-message");
    }
// Validar correo electrónico
if (!mail.test(email)) {
    erremail.textContent = "Ingrese una dirección de correo válida (por ejemplo, usuario@dominio.com)";
    erremail.classList.add("error-message");
    } else {
    erremail.textContent = "";
    erremail.classList.remove("error-message");
    }
    //validar cuil
    if (isNaN(cuil) || cuil.length !== 11) {
        errcuil.textContent = "El CUIL debe ser un número de 11 dígitos";
        errcuil.classList.add("error-message");
        } else {
        errcuil.textContent = "";
        errcuil.classList.remove("error-message");
        }
    //validar contraseña
    if (contra.length < 6) {
        errcontra.textContent = "La contraseña debe tener al menos 6 caracteres";
        errcontra.classList.add("error-message");
        } else{
        errcontra.textContent = "";
        errcontra.classList.remove("error-message");
        }
        //confirmar y contraseña sean iguales
        if (contra !== confir) {
        errconfir.textContent = "Las contraseñas no coinciden";
        errconfir.classList.add("error-message");
        } else {
        errconfir.textContent = "";
        errconfir.classList.remove("error-message");
        }

        //todos los campos deben estar completos
    if (razonSocial === "" || email === "" || cuil === "" ||  contra === "" || confir === "") {
    errform.textContent = "Rellene todos los campos del formulario";
    errform.classList.add("error-message");
    } else {
    errform.textContent = "";
    errform.classList.remove("error-message");
    }
}
