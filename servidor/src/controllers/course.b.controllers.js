import {CourseBank} from '../model/course.bank.js';
import {bank} from '../model/bank.js';
//crear curso
export const crearcoursBank = async (req, res) => {
    const {nombre, duracion , descripcion, nivel, category} = req.body
    const id_bank = +req.params.id_bank
    try {
        const foundBank = await bank.findByPk(id_bank)
        if (!foundBank) {
            return res.status(404).json({message: 'El usuario no ha sido encontrado'})
        }
    
        const createCourse = await CourseBank.create ({
            id_bank : id_bank,
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
//buscar curso
export const BuscarCourseB = async (req, res) => {
    const {nombre} = req.params.nombre

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
//editar curso
export const editarCurso = async (req, res) => {
    const id = +req.params.id_course_b ;
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
        res.status(500).json({ message: 'Se produjo un error al editar el curso', error });
    }
};

//eliminar curso
export const eliminarCursoB = async (req, res) => {
    const id = +req.params.id_course_b ;
    try {
        // Buscar el curso por su ID
        const curso = await CourseBank.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'El curso que desea eliminar no ha sido encontrado' });
        }
        // Eliminar el curso de la base de datos
        await curso.destroy();
        res.json({ message: 'El curso ha sido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Se produjo un error al eliminar el curso', error });
    }
};
