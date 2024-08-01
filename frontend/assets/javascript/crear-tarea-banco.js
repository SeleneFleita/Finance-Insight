
        async function crearCurso(e) {
          const title = document.getElementById('courseTitle').value;
          const category = document.getElementById('courseCategory').value;
          const description = document.getElementById('courseDescription').value;
          const duration = document.getElementById('courseDuration').value;
          // Obtén el token de alguna manera (localStorage, cookies, etc.)
          const token = localStorage.getItem('authToken'); 
          // Validar token
        if (!token) {
            alert('Token de autenticación no encontrado');
            return;
            }
            //url
            const urlCrear = 'http://localhost:4000/api/banco/curso/crear'
            //estructura del curso
          const tarea = {
              nombre : title, 
              categoria : category,
              duracion : duration, 
              descripcion : description
              };
              //metodo
              const metodo = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(tarea)
              }
              try {
                const peticion = await fetch(urlCrear, metodo)
                const respuesta = await peticion.json();
                if (peticion.ok) {
                  alert('Curso creado exitosamente');
                } else {
                  alert(`Error: ${respuesta.msg || 'Se produjo un error'}`);
                }
              } catch (error) {
                console.log(error);
                alert('Hubo un problema con la solicitud: ' + error.msg);
              }
            }
          
            
    
    
