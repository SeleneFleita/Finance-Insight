const { connectDB } = require("../db/database");
const bcrypt = require("bcrypt");

const ctrl = {};

// Controlador para crear usuario normal o de banco
ctrl.registerUser = async (req, res) => {
    let { tipo_usuario, nombre_apellido, fecha_nac, dni, mail_cliente, contrasenia, razon_social, email_banco, cuil, pass_banco } = req.body;

    // Hacemos la conexion a la base de datos.
    const connection = await connectDB();

    // Determinamos qué tipo de usuario se está registrando y ajustamos los datos según corresponda.
    let sql, hashContrasenia;

    if (tipo_usuario === 'normal') {
        sql = 'INSERT INTO cliente_comun (nombre_apellido, fecha_nac, dni, mail_cliente, contrasenia) VALUES (?,?,?,?,?)';
        hashContrasenia = bcrypt.hashSync(contrasenia, 10);
    } else if (tipo_usuario === 'banco') {
        sql = 'INSERT INTO cliente_banco (razon_social, email_banco, cuil, pass_banco) VALUES (?,?,?,?)';
        hashContrasenia = bcrypt.hashSync(pass_banco, 10); // Asumo que 'pass_banco' es la contraseña para usuario de banco
    } else {
        return res.status(400).json({ error: 'Tipo de usuario no válido' });
    }

    try {
        // Ejecutamos la consulta.
        await connection.query(sql, [nombre_apellido, fecha_nac, dni, mail_cliente, hashContrasenia]);

        // Respondemos al cliente según el tipo de usuario registrado.
        if (tipo_usuario === 'normal') {
            res.json({
                msg: 'Registrado correctamente como usuario normal'
            });
        } else if (tipo_usuario === 'banco') {
            res.json({
                msg: 'Registrado correctamente como usuario de banco'
            });
        }
    } catch (error) {
        console.error(`Error al registrar usuario ${tipo_usuario}:`, error.message);
        res.status(500).json({
            error: `Error al registrar usuario ${tipo_usuario}`
        });
    }
}

// Exportar el módulo
module.exports = ctrl;
