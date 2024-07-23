import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import {conexionBD} from '../bd/basedata.js';

export const registerClient = async (req, res) => {
    const {nombre_apellido, dni, mail_client, telefono_client, password_client, country, province} = req.body
    try {
        //valida si ya existe el usuario proporcionado
        const [rows, fields] = await conexionBD.promise().query('SELECT * FROM client WHERE dni = ?', [dni]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "El usuario que desea registrar ya existe en nuestro sistema" });
        }
        //encriptamos contraseña
        const hashedPassword = bcrypt.hash(password_client, 5)
        //conseguimos el id province/country
        const [countryRow] = await conexionBD.promise().query('SELECT id_country FROM country WHERE nombre = ?', [country]);
        const [provinceRow] = await conexionBD.promise().query('SELECT id_province FROM province WHERE nombre = ?', [province]);
        //obtener el id
        const id_country = countryRow[0].id_country;
        const id_province = provinceRow[0].id_province;
        //consulta de insercion
        const sql = 'INSERT INTO client(nombre_apellido, dni, mail_client, telefono_client, password_client, id_country, id_province) VALUE(?,?,?,?,?,?,?) '
        //insertar nuevos datos
        const result = await conexionBD.promise().query(sql, [nombre_apellido, dni, mail_client, telefono_client, password_client, id_country, id_province])
        //generar token
        const token = jwt.sign({ id: result.id_client, role: 'client' }, 'my_secret', { expiresIn: '1h' });
        //respuesta de creacion exitosa 
        res.status(201).json({
            status: 201,
            message: 'Usuario banco creado correctamente',
            token,
            Nuevo_usuario: {
                nombre_apellido,
                dni,
                mail_client,
                telefono_client,
                id_country,
                id_province
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const loginClient = async (req, res) => {
    const {mail_client, password} = req.body
    try {
        const user = await conexionBD.promise().query('SELECT mail_client FROM client WHERE mail_client = ? LIMIT 1', [mail_client])
        if (user.length == 0) {
            return res.status(404).json({ message: "El usuario que desea logear no se encuentra en nuestro sistema" });
        }
        const validpass = await bcrypt.compareSync(password, user[0].password_client)
        if (!validpass) {
            return res.json({message: 'La contraseña no coincide'})
        }
        const token = jwt.sign({id : user[0].id_client, role : user[0].role}, 'my_secret')
        res.json({
            message: 'Inicio de sesión exitoso',
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}