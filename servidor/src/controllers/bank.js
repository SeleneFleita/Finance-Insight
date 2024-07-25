import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {pool} from '../bd/basedata.js';



export const registerBank = async (req, res) => {
    const { razon_social, cuit, mail_bank, telefono, password_bank, country, province} = req.body;
    try {
        
        // Verificar si el banco ya existe en la base de datos
        const existeUser = await pool.query('SELECT cuit FROM bank WHERE cuit = ? ', [cuit]);
        if (existeUser.length > 0) {
            return res.status(400).json({ message: "El usuario que desea registrar ya existe en nuestro sistema" });
        }else{
    // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password_bank, 5);
    // Obtener id_country y id_province
        

        
        
        // Consulta de inserción
        const sql = 'INSERT INTO bank (razon_social, cuit, mail_bank, telefono_bank, id_counyprov,  password_bank ) VALUES (?, ?, ?, ?, ?, ?)';
        
        const [pc] = await pool.query('SELECT cp.id_counyprov FROM country_province cp JOIN province p ON cp.id_province = p.id_province JOIN country c ON cp.id_country = c.id_country WHERE p.nombre = ? AND c.nombre = ?; ', [province, country])
        const id_counyprov = pc[0].id_counyprov
        // Insertar el nuevo banco en la base de datos
        const result = await pool.query(sql, [razon_social, cuit, mail_bank, telefono,id_counyprov, hashedPassword]);
        // Crear el token JWT
        const token = jwt.sign({ id: result.id_bank, role: 'bank' }, 'my_secret', { expiresIn: '1h' });
    // Respuesta después de la creación exitosa del banco
    res.status(201).json({
        status: 201,
        message: 'Usuario banco creado correctamente',
        token,
        Nuevo_usuario: {
            razon_social,
            cuit,
            mail_bank,
            telefono,
            id_counyprov
        }
    });
        }
        
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
};


export const loginBank = async (req, res) => {
    const { mail_bank, password } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const [usuario] = await pool.query('SELECT * FROM bank WHERE mail_bank = ? LIMIT 1', [mail_bank]);
        console.log(usuario);
        // Verificar si el usuario existe
        if (usuario.length === 0) {
            return res.status(404).json({ message: "El usuario que desea logear no se encuentra en la base de datos" });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada en la base de datos
        const validPass = await bcrypt.compareSync(password, usuario[0].password_bank);
        
        // Verificar la contraseña
        if (!validPass) {
            return res.status(401).json({ message: 'La contraseña no coincide' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario[0].id_bank, role: usuario[0].role }, 'my_secret');

        // Enviar respuesta con token
        res.json({
            message: 'Inicio de sesión exitoso',
            token: token
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        // Manejo de errores y envío de respuesta de error
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
