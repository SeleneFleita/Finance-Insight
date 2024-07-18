import {CourseBank} from '../model/course.bank.js';
import {bank} from '../model/bank.js';

export const crearcoursBank = async (req, res) => {
    const {nombre, duracion , descripcion, nivel, category, razon_social, cuit} = req.body
    try {
        const foundBank = await bank.findOne({where: {
            cuit : cuit
        }})
    
        const createCourse = await CourseBank.create ({
            id_bank : foundBank.id_bank,
            nombre,
            duracion,
            descripcion,
            nivel,
            category
        })
        res.status(201).json({
            message: 'El curso ha sido creado exitosamente',
            curso : createCourse
        })
    } catch (error) {
        res.status(500).json({
            message: 'se produjo un error ', error
        })
    }
}

export const BuscarCourseB = async (req, res) => {
    const {nombre} = req.body.nombre

    try {
        const courseFound = await CourseBank.findOne({where : {nombre : nombre}})
    if(!courseFound){
        return res.status(404).json({message: 'Curso no encontrado'})
    }
    res.status(201).json({courseFound})
    } catch (error) {
        res.status(500).json({
            message: 'se produjo un error ', error
        })
    }
    
}

export const editarCurso = async (req, res) => {
    const id = req.body.id_course_b;
    const { nombre, duracion, descripcion, nivel, category } = req.body;
    try {
        // Buscar el curso por su ID
        const cursoEncontrado = await CourseBank.findByPk(id);
        if (!cursoEncontrado) {
            return res.status(404).json({ message: 'El curso que desea editar no ha sido encontrado' });
        }
        // Actualizar los campos del curso encontrado
        cursoEncontrado.nombre = nombre;
        cursoEncontrado.duracion = duracion;
        cursoEncontrado.descripcion = descripcion;
        cursoEncontrado.nivel = nivel;
        cursoEncontrado.category = category;
        // Guardar los cambios en la base de datos
        await cursoEncontrado.save();
        // Responder con éxito
        res.status(200).json({ message: 'Curso editado correctamente', curso: cursoEncontrado });
    } catch (error) {
        // Manejar errores
        console.error('Error al editar el curso:', error);
        res.status(500).json({ message: 'Se produjo un error al editar el curso', error });
    }
};

export const eliminarCursoB = async (req, res) => {
    const id = req.body.id_course_b;
    try {
        const curso = await CourseBank.findByPk(id)
        if(!curso){
            return res.status(404).json({message: 'El curso que desea eliminar no ha sido encontrado'})
        }
        //eliminar curso
        curso.destroy();
        res.json({message: 'El usuario ha sido eliminado correctamente'})

    } catch (error) {
        res.status(500).json({
            message: 'Se produjo un error', error
        })
    }
}