import {pool} from '../bd/basedata.js';

export const mostrarTodoslosCursos = async (req, res) =>{
    try {
        const [result] = await pool.query('SELECT nombre_curso, categoria, duracion, descripcion FROM course_bank');
        
        // Verifica si hay resultados y envíalos
        if (!result === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos.' });
        }

        // Envía los cursos en formato JSON
        res.status(200).json(result);
    } catch (error) {
        // Manejo de errores
        console.error('Se produjo un error:', error.message); 
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}