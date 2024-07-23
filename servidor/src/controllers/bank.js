import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {conexionBD} from '../bd/basedata.js';



export const registerBank = async (req, res) => {
    const { razon_social, cuit, mail_bank, telefono, password_bank, country, province } = req.body;
    try {
        // Verificar si el banco ya existe en la base de datos
        const [rows, fields] = await conexionBD.promise().query('SELECT * FROM bank WHERE cuit = ?', [cuit]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "El usuario que desea registrar ya existe en nuestro sistema" });
        }
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password_bank, 5);
        // Obtener id_country y id_province
        const [countryRow] = await conexionBD.promise().query('SELECT id_country FROM country WHERE nombre = ?', [country]);
        const [provinceRow] = await conexionBD.promise().query('SELECT id_province FROM province WHERE nombre = ?', [province]);
        const id_country = countryRow[0].id_country;
        const id_province = provinceRow[0].id_province;
        // Consulta de inserción
        const sql = 'INSERT INTO bank (razon_social, cuit, mail_bank, telefono, password_bank, id_country, id_province) VALUES (?, ?, ?, ?, ?, ?, ?)';
        // Insertar el nuevo banco en la base de datos
        const result = await conexionBD.promise().query(sql, [razon_social, cuit, mail_bank, telefono, hashedPassword, id_country, id_province]);
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
                id_country,
                id_province
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


    export const loginBank = async (req, res) => {
        const {mail_bank, password} = req.body;
        try {
            const usuario = await conexionBD.promise().query('SELECT * FROM bank WHERE mail_bank = ? LIMIT 1', [mail_bank])
            if (usuario === 0) {
                return res.status(404).json({message : 'Usuario no encontrado'})
            }
            const validpass = await bcrypt.compareSync(password, usuario[0].password_bank)
            if (!validpass) {
                return res.json({message: 'La contraseña no coincide'})
            }
            const token = jwt.sign({id : usuario[0].id_bank, role : usuario[0].role}, 'my_secret')
            res.json({
                message: 'Inicio de sesión exitoso',
                token: token
            });
        } catch (error) {
            res.status(500).send('Se produjo un error al intentar iniciar sesion', error);
        }
    }