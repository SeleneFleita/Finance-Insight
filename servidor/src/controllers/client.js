import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {pool} from '../bd/basedata.js';

export const registerClient = async (req, res) => {
    const { nombreyapellido, dni, mail_client, telefono_client, password_client, country, province} = req.body;
    try {
        //validacion
        const [existeUser] = await pool.query('SELECT * FROM client WHERE dni = ?', [dni]);
        if (existeUser === 0) {
            return res.status(400).json({ message: "El DNI que ha ingresado ya está registrado en nuestro sistema" });
        }
         console.log(existeUser);
        // Verificar si el email ya está registrado
        const [mail_exist] = await pool.query('SELECT mail_client FROM client WHERE mail_client = ?', [mail_client]);
        if (mail_exist.length > 0) {
            return res.status(400).json({ message: "El email que ha ingresado ya está registrado en nuestro sistema" });
        }
        
        //id_counyprov
        const [pc] = await pool.query('SELECT cp.id_counyprov FROM country_province cp JOIN province p ON cp.id_province = p.id_province JOIN country c ON cp.id_country = c.id_country WHERE p.nombre = ? AND c.nombre = ?; ', [province, country])
        const id_counyprov = pc[0].id_counyprov
        //hash
        const hashedPassword = await bcrypt.hash(password_client, 5);
        //consulta
        const sql = 'INSERT INTO CLIENT(nombre_apellido, dni, mail_client, telefono_client, id_counyprov, password_client) VALUES(?,?,?,?,?,?)'
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

export const loginClient = async (req, res) => {
    const { mail_client, password } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const [usuario] = await pool.query('SELECT * FROM client WHERE mail_client = ? LIMIT 1', [mail_client]);
        // Verificar si el usuario existe
        if (usuario.length === 0) {
            return res.status(404).json({ message: "El usuario que desea logear no se encuentra en la base de datos" });
        }
        
        // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
        const validPass = bcrypt.compareSync(password, usuario[0].password_client);
        // Verificar la contraseña
        if (!validPass) {
            return res.status(401).json({ message: 'La contraseña no coincide' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario[0].id_client, role: usuario[0].role }, 'my_secret');

        // Enviar respuesta con token
        res.json( console.log("inicio sesion"),{
            message: 'Inicio de sesión exitoso',
            token: token
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        // Manejo de errores y envío de respuesta de error
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};