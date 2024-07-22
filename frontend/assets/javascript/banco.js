// datos personales
var modal = document.getElementById("modalDatos");
var linkVerDatos = document.getElementById("verDatos");
var spanCerrar = document.getElementsByClassName("close")[0];

// Cuando se hace clic en "Mis datos", mostrar datos
linkVerDatos.onclick = function() {
    modal.style.display = "block";
}

// presiona para cerrar oculta
spanCerrar.onclick = function() {
    modal.style.display = "none";
}

// Si hace clic fuera oculta
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// cambio de contraseña
var modalCambioClave = document.getElementById("modalCambioClave");
var linkCambioClave = document.getElementById("cambioClave");
var spanCerrarCambioClave = document.querySelector("#modalCambioClave .close");

// Cuando hace clic en "Cambio de clave", muestra el formulario
linkCambioClave.onclick = function() {
    modalCambioClave.style.display = "block";
}

// presiona para cerrar oculta
spanCerrarCambioClave.onclick = function() {
    modalCambioClave.style.display = "none";
}

// Si hace clic fuera oculta
window.onclick = function(event) {
    if (event.target == modalCambioClave) {
        modalCambioClave.style.display = "none";
    }
}