const bancoForm = document.getElementById('bancoForm');
const comunForm = document.getElementById("clienteForm")
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	
}

const validarFormulario = (e)=>{
    switch (e.target.name){
        case "nombre":
            if(expresiones.nombre.test(e.target.value)){

            }else{
                document.getElementById("nombre").classListadd(".formulario__grupo-correcto .formulario__validacion-estado")
            }

        break;
        case "contraseña":
            

        break;
        case "contraseña2":
            

        break;
        case "email":
            

        break;
    }
}

inputs.forEach((input)=>{
input.addEventListener("keyup", ()=>{
    
})
})
formulario.addEventListener("submit", (e)=>{
e.preventDefault();
})