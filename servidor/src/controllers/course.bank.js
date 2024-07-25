import {pool} from '../bd/basedata.js';

export const crearCourseBank = async (req, res) => {
    const {nombre, duracion , descripcion} = req.body
    const id_bank = req.id_bank

    try {
    const sql = 'INSERT INTO course (id_bank, nombre_curso, duracion, descripcion) VALUES (?, ?, ?, ?)'
        await pool.query(sql, [id_bank, nombre, duracion, descripcion])
    res.status(201).json({
        message: 'El curso ha sido creado exitosamente',
        curso: {
            nombre,
            duracion,
            descripcion
        } })
    } catch (error) {
        console.log(error);
    }}
    