import {pool} from '../bd/basedata.js';

//crear curso
export const crearCourseBank = async (req, res) => {
    const {cuit, nombre, duracion , descripcion} = req.body
    
    
    try {
        //conseguimos el id_banco
        const [banco ] = await pool.query('SELECT * FROM bank WHERE CUIT = ?', [cuit])
        console.log(banco);
        //validar
        
        if (banco.length === 0 ){
            return res.status(404).json({ message: "El CUIT que ha ingresado no está registrado en nuestro sistema" });
        }
        const [cursoExist] = await pool.query('SELECT * FROM course_bank WHERE nombre_curso = ?', [nombre]);
        if (cursoExist.length != 0) {
            return res.status(400).json({ message: "El curso que ha ingresado ya está registrado en nuestro sistema" });
        }
        
        const id_bank = banco[0].id_bank
        //insertar
    const sql = 'INSERT INTO course_bank( id_bank, nombre_curso, duracion, descripcion) VALUES ( ?, ?, ?, ?)'
        await pool.query(sql, [ id_bank, nombre, duracion, descripcion])
    res.status(201).json({
        message: 'El curso ha sido creado exitosamente',
        curso: {
            nombre,
            duracion,
            descripcion
        } })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }}
    