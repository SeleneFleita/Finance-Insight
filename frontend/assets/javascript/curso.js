const cardContainer = document.getElementById('contentC');

//funcion para agregar tareas
async function pintarCursos(data) {
    // Vaciar el contenedor una vez antes de agregar los cursos
    cardContainer.innerHTML = '';
    
    // Recorrer cada curso y agregarlo al contenedor
    data.forEach(curso => {
        cardContainer.innerHTML += `
        <div id="card" class="card-container">
            <div class="titleanddes">
                <h2>${curso.nombre_curso}</h2>
                <label for=""><b>Descripcion</b></label>
                <p>${curso.descripcion}</p>
            </div>
            <div class="infog">
                <label for=""><b>Categoria</b></label>
                <p><small>${curso.categoria}</small></p>
                <label for=""><b>Duracion</b></label>
                <p><small>${curso.duracion}h</small></p>
                <button class = 'boton'>Inscribirme</button>
            </div>
        </div>
        `;
    });
}

async function obtenerCursos (){
    const peticion = await fetch('http://localhost:4000/api/cursos',)
    const response = await peticion.json()
    console.log(response);
    pintarCursos(response)
}

document.addEventListener('DOMContentLoaded', obtenerCursos);