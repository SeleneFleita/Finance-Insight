import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {pool} from '../bd/basedata.js';

export const registerClient = async (req, res) => {
    const { nombreyapellido, dni, mail_client, telefono_client, password_client, country, province} = req.body;
    try {
        //validacion
        
        
        //id_counyprov
        const [pc] = await pool.query('SELECT cp.id_counyprov FROM country_province cp JOIN province p ON cp.id_province = p.id_province JOIN country c ON cp.id_country = c.id_country WHERE p.nombre = ? AND c.nombre = ?; ', [province, country])
        const id_counyprov = pc[0].id_counyprov
        //hash
        const hashedPassword = await bcrypt.hash(password_client, 5);
        //consulta
        const sql = 'INSERT INTO CLIENT(nombre_apellido, dni, mail_client, telefono_client, id_counyprov) VALUES(?,?,?,?,?)'
        //
        const result = await pool.query(sql, [nombreyapellido, dni, mail_client, telefono_client, id_counyprov, hashedPassword ])
        //token
        const token = jwt.sign({ id: result.id_client, role: 'cliente' }, 'my_secret', { expiresIn: '1h' });
    // Respuesta 
    res.status(201).json({
        status: 201,
        message: 'Usuario creado correctamente',
        token,
        Nuevo_usuario: {
            nombreyapellido,
            dni,
            mail_client,
            telefono_client,
            id_counyprov
        }
    });
    } catch (error) {
        console.log(error);
    }
}