//desplazar

console.log("hola mundo");

async function registrarClient(e) {
    e.preventDefault();
    // Valores del input
const nombre_apellido = document.getElementById("nombreap-cliente").value;
const dni = document.getElementById("dni-cliente").value.trim();
const mail_client = document.getElementById("mail-cliente").value.trim();
const telefono_client = document.getElementById("telefono-cliente").value.trim();
const password_client = document.getElementById("contracli-cliente").value;
const country = document.getElementById("pais-cliente").value;
const province = document.getElementById("province-cliente").value;
const form = document.getElementsByClassName("submit")

const urlRegistroClient = "http://localhost:4000/api/client/register"

let ingreso = {
    nombre_apellido : "",
    dni : "",
    mail_client : "",
    telefono_client : "",
    password_client: "",
    country : "",
    province : ""
}
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    ingreso.nombre_apellido = nombre_apellido;
    ingreso.dni = dni;
    ingreso.mail_client = mail_client;
    ingreso.telefono_client = telefono_client;
    ingreso.password_client = password_client;
    ingreso.country = country;
    province.province = province;
})
const metodo =  {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },   
    body: JSON.stringify(ingreso)
};

const peticion = await fetch(urlRegistroClient, metodo);
const respuesta = await peticion.json();

if (!peticion.ok) {
    //si falla
    alert(respuesta.msg)
} else {
    alert(respuesta.msg)
    //redirigir
    window.location.href = 'frontend/reg-log/inicioSesion.html'
}
form.addEventListener('submit', register);
}



//validar cliente
function validarCliente() {
// Valores del input
const nypcliente = document.getElementById("nombreap-cliente").value;
const dni = document.getElementById("dni-cliente").value.trim();
const mail = document.getElementById("mail-cliente").value.trim();
const con = document.getElementById("contracli-cliente").value;
const confir = document.getElementById("confconcli-cliente").value;


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
mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Correo electrónico válido
dosPalabras: /^[a-zA-Z]+\s[a-zA-Z]+$/  // Expresión regular para validar dos palabras separadas por espacio
};

// Validar nombre y apellido
if (!validar.nombreyapellido.test(nypcliente)) {
errnypcliente.textContent = "El nombre y apellido deben contener solo letras y espacios";
errnypcliente.classList.add("error-message");
}else{
errnypcliente.textContent = "";
errnypcliente.classList.remove("error-message");
}
//validar nombre y apellido
if (!validar.dosPalabras.test(nypcliente)) {
    errnypcliente.textContent = "El nombre y apellido son obligatorios";
    errnypcliente.classList.add("error-message");
} else {
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
    errrazonSocial.textContent = "Debe tener como minimo 4 caracteres";
    errrazonSocial.classList.add("error-message");
    } else {
    errrazonSocial.textContent = "";
    errrazonSocial.classList.remove("error-message");
    }
// Validar correo electrónico
if (!mail.test(email)) {
    erremail.textContent = "Ingrese un correo válido";
    erremail.classList.add("error-message");
    } else {
    erremail.textContent = "";
    erremail.classList.remove("error-message");
    }
    //validar cuil
    if (isNaN(cuil) || cuil.length !== 11) {
        errcuil.textContent = "debe contener de 11 dígitos";
        errcuil.classList.add("error-message");
        } else {
        errcuil.textContent = "";
        errcuil.classList.remove("error-message");
        }
    //validar contraseña
    if (contra.length < 6) {
        errcontra.textContent = "debe contener almenos 6 caracteres";
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
