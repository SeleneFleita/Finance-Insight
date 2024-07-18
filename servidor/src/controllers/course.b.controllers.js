import {CourseBank} from '../model/course.bank.js';
import {bank} from '../model/bank.js';

export const createcoursBank = async (req, res) => {
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