import {conexionBD} from '../bd/basedata.js';

export const crearCourseBank = async (req, res) => {
    const {nombre, duracion , descripcion, nivel, category} = req.body
    const id_bank = req.id_bank
    try {
    const sql = 'INSERT INTO course (id_bank, nombre, duracion, descripcion, nivel, category) VALUES (?, ?, ?, ?, ?, ?)'
    const newCourse = await conexionBD.promise().query(sql, [id_bank, nombre, duracion, descripcion, nivel, category])
    res.status(201).json({
        message: 'El curso ha sido creado exitosamente',
        curso: newCourse })
    } catch (error) {
        
    }
}