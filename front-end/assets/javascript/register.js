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

async function validacionBanco() {
    var razonSocial = document.getElementById("usu-banco").value.trim();
    var email = document.getElementById('mail-banco').value.trim();
    var cuil = document.getElementById('cuil-banco').value.trim();
    var password = document.getElementById('pass-banco').value;
    var confirmPassword = document.getElementById('confirm-pass-banco').value;

    // Validar todos los campos obligatoriamente
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

    // Validación del CUIL (debe tener exactamente 11 dígitos numéricos)
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
    let datoBanco = {
        "tipo_usuario": "banco",
        "razon_social": razonSocial,
        "email_banco": email,
        "cuil": cuil,
        "pass_banco": password
    };

    // Convertir a JSON los datos del banco
    let datosBancoJSON = JSON.stringify(datoBanco);

    // Enviar los datos al servidor para registro de banco
    try {
        await enviarDatosAlServidor("http://127.0.0.1:5500/front-end/register.html", datosBancoJSON);
        return true;
    } catch (error) {
        alert('Hubo un error al registrar el banco.');
        return false;
    }
}

async function validarRegistro() {
    let nombreApellido = document.getElementById('nombreap-cliente').value.trim();
    let fechaNacimiento = document.getElementById('fechanac-cliente').value.trim();
    let dni = document.getElementById('dni-cliente').value.trim();
    let email = document.getElementById('mail-cliente').value.trim();
    let contrasena = document.getElementById('contracli-cliente').value;
    let confirmarContrasena = document.getElementById('confconcli-cliente').value;

    // Validación de campos vacíos
    if (nombreApellido === '' || fechaNacimiento === '' || dni === '' || email === '' || contrasena === '' || confirmarContrasena === '') {
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
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Si todas las validaciones son exitosas, se puede enviar el formulario
    let datosCliente = {
        "tipo_usuario": "normal",
        "nombre_apellido": nombreApellido,
        "fecha_nac": fechaNacimiento,
        "dni": dni,
        "mail_cliente": email,
        "contrasenia": "contrasena"
    };

    // Convertir a JSON los datos del cliente
    let datosClienteJSON = JSON.stringify(datosCliente);

    // Enviar los datos al servidor para registro de cliente normal
    try {
        await enviarDatosAlServidor('http://127.0.0.1:5500/front-end/register.html', datosClienteJSON);
        return true;
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
        return false;
    }
}

async function enviarDatosAlServidor(url, datosJSON) {
    try {
        const response = await fetch('http://localhost:3003' + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: datosJSON
        });

        if (!response.ok) {
            throw new Error('Error al registrar el usuario.'); // Lanzar un error si la respuesta no es exitosa
        }

        const data = await response.json(); // Convertir la respuesta a JSON
        console.log(data); // Mostrar en consola la respuesta del servidor

        // Redirigir al usuario al login después de registrar correctamente
        window.location.href = 'front-end/assets/javascript/inicioS.js';
        alert('Usuario registrado exitosamente.'); // Mostrar un mensaje de éxito al usuario
    } catch (error) {
         // Mostrar un error en consola si ocurre algún problema
        alert('Hubo un error al registrar el usuario.', error); // Mostrar un mensaje de error al usuario
    }
}
