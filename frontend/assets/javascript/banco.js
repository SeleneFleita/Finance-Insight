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
//ver cursos
let linkverCursos = document.getElementById("verCursos");
let modalCurso = document.getElementById("modalListadoCurso")
var spanCerrar = document.getElementsByClassName("close-cursos")[0];
//aparecer al presionar el link
linkverCursos.onclick = function() {
    modalCurso.style.display = "block"
}
//cerrar
spanCerrar.onclick = function(){
    modalCurso.style.display = "none"
}
//cerrar si presiona afuera
window.onclick = function(event) {
    if (event.target == modalCurso) {
        modalCurso.style.display = "none"
    }
}

//editar informacion personal
let linkeditarInfoP = document.getElementById("editarInfo");
let modalEditarinfo = document.getElementById("modalListadoCurso")
var spanCerrarEI = document.getElementsByClassName("close-cursos")[0];
//aparecer al presionar el link
linkeditarInfoP.onclick = function() {
    modalEditarinfo.style.display = "block"
}
//cerrar
spanCerrarEI.onclick = function(){
    modalEditarinfo.style.display = "none"
}
//cerrar si presiona afuera
window.onclick = function(event) {
    if (event.target == modalCurso) {
        modalEditarinfo.style.display = "none"
    }
}

//cerrar sesion
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const confirmationDialog = document.getElementById('confirmationDialog');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    logoutButton.addEventListener('click', () => {
        confirmationDialog.classList.remove('hidden');
    });

    confirmYes.addEventListener('click', () => {
        // Redirigir al login
        window.location.href = '../reg-log/inicioSesion.html';
    });

    confirmNo.addEventListener('click', () => {
        confirmationDialog.classList.add('hidden');
    });
});
