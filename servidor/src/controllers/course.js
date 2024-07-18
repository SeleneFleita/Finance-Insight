import {course} from '../model/course';

export const createCourse = async (req, res) => {
const {nombre, duracion, requisitos, descripcion, category, nivel} = req.body;
try {
    const courseExist = await course.findOne({where : {nombre : nombre, category : category, nivel: nivel}})
    if (courseExist){
        return res.status(404).json({message: 'El curso ingresado ya existe en nuestro sistema'})
    }
    const newCourse = await course.create({
        nombre,
        duracion,
        requisitos,
        descripcion,
        category,
        nivel
    }
    )
    res.status(201).json({
        status: 201,
        message: 'El curso ha sido creado exitosamente',
        curso : newCourse
    })
} catch (error) {
    res.status(500).json('se produjo un error', error)
}
}

