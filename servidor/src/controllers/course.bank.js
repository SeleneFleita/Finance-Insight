import {pool} from '../bd/basedata.js';

//crear curso
export const crearCourseBank = async (req, res) => {
    const { nombre, categoria, duracion, descripcion } = req.body;
    const id_bank = req.id_bank; // Extraído del token
    console.log("ID del banco:", id_bank);

    try {
        console.log(0);
        // Verifica si el curso ya existe
        const [cursoExist] = await pool.query('SELECT * FROM course_bank WHERE nombre_curso = ?', [nombre]);
        console.log(cursoExist);
        if (cursoExist.length !== 0) {
            res.status(400).json({ message: "El curso que ha ingresado ya está registrado en nuestro sistema" })
            return console.log("El curso que ha ingresado ya está registrado en nuestro sistema");;
        }
        console.log(1);
        // Inserta el nuevo curso en la base de datos
        const sql = 'INSERT INTO course_bank(id_bank, nombre_curso, categoria, duracion, descripcion) VALUES (?, ?, ?, ?, ?)';
        await pool.query(sql, [id_bank, nombre, categoria, duracion, descripcion]);
        console.log(2);
        res.status(201).json({
            message: 'El curso ha sido creado exitosamente',
            curso: {
                id: id_bank,
                nombre: nombre,
                categoria: categoria,
                duracion: duracion,
                descripcion: descripcion
            }
        });
    } catch (error) {
        console.error("Error al crear curso:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
    