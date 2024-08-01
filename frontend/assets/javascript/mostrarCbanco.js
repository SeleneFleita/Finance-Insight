document.addEventListener('DOMContentLoaded', async () => { 
    //obtener token
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Token de autenticación no encontrado');
    }
    try {
        const response = await fetch('http://localhost:4000/api/banco/curso/mostrar', {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }) 

        if (!response) {
            console.log('no hay cursos');
            alert('no se encontro')
        }
        const cursos = await response.json();

        const tbody = document.getElementById('cursos')
        tbody.innerHTML = '';

        cursos.forEach(cursos => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cursos.nombre_curso}</td>
                <td>${cursos.categoria}</td>
                <td>${cursos.descripcion}</td>
                <td>${cursos.duracion}</td>
                <td>
                    <a href="#" class="btn btn-secondary btn-sm">Editar</a>
                    <a href="#" class="btn btn-danger btn-sm">Eliminar</a>
                </td>
            `
        });

    } catch (error) {
        alert('se produjo un error' + error)
    }
})