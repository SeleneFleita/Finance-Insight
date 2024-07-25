import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {pool} from '../bd/basedata.js';



export const registerBank = async (req, res) => {
    const { razon_social, cuit, mail_bank, telefono, password_bank, country, province } = req.body;
    try {
        
        // Verificar si el banco ya existe en la base de datos
        const rows = await pool.query('SELECT cuit, mail_bank FROM bank WHERE cuit = ? ', [cuit]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "El usuario que desea registrar ya existe en nuestro sistema" });
        }else{
// Encriptar la contraseña
const hashedPassword = await bcrypt.hash(password_bank, 5);
// Obtener id_country y id_province
const countryRow = await pool.query('SELECT id_country FROM country WHERE nombre = ?', [country]);
const province = await pool.query('SELECT id_province FROM country WHERE nombre = ?', [province]);
const id_country = countryRow[0].id_country;
const id_province = province[0].id_province;
//conseguir id provincia y pais(tabla)
//const id_counyprov = await pool.query('SELECT id_counyprov FROM country_province WHERE id_country = ? AND id_province = ?', [id_country, id_province]);
// Consulta de inserción
const sql = 'INSERT INTO bank (razon_social, cuit, mail_bank, telefono, password_bank, id_country) VALUES (?, ?, ?, ?, ?, ?)';
// Insertar el nuevo banco en la base de datos
const result = await pool.query(sql, [razon_social, cuit, mail_bank, telefono, hashedPassword, id_country]);
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
        //id_counyprov
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
