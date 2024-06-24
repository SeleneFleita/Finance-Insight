const {connectDB} = require("../db/datebasa");
const bcrypt = require("bcrypt");


const ctrl = {}
//controlador para crear usuario
ctrl.registerNormal = async (req, res) => {
    const { nombre_apellido, fecha_nac, dni, mail_cliente, contrasenia } = req.body;
    
    // Hacemos la conexion a la base de datos.
    const connection = await connectDB();

    // Creamos la consulta.
    const sql = 'INSERT INTO cliente_comun (nombre_apellido, fecha_nac, dni, mail_cliente, contrasenia) VALUES (?,?,?,?,?)';

    // Encriptamos la contraseña utilizando la libreria bcrypt.
    const hashContrasenia = bcrypt.hashSync(contra, 10);

    try {
        // Ejecutamos la consulta.
        await connection.query(sql, [nombre_apellido, fecha_nac, dni, mail_cliente, contrasenia]);

        // Respondemos al cliente
        res.json({
            msg: 'Registrado correctamente como usuario normal'
        });
    } catch (error) {
        console.error('Error al registrar usuario normal:', error.message);
        res.status(500).json({
            error: 'Error al registrar usuario normal'
        });
    }
}

//registro banco
ctrl.registerBanco = async (req, res) => {
    const { razon_social, email_banco, cuil, pass_banco} = req.body;
    
    // Hacemos la conexion a la base de datos.
    const connection = await connectDB();

    // Creamos la consulta.
    const sql = 'INSERT INTO cliente_banco (razon_social, email_banco, cuil, pass_banco) VALUES (?,?,?,?)';

    // Encriptamos la contraseña utilizando la libreria bcrypt.
    const hashContrasenia = bcrypt.hashSync(contrasenia, 10);

    try {
        // Ejecutamos la consulta.
        await connection.query(sql, [razon_social, cuil, correo, hashContrasenia]);

        // Respondemos al cliente
        res.json({
            msg: 'Registrado correctamente como usuario de banco'
        });
    } catch (error) {
        console.error('Error al registrar usuario de banco:', error.message);
        res.status(500).json({
            error: 'Error al registrar usuario de banco'
        });
    }
}


//obtener usuario por su id


//actualizar un usuario


//borrar usuario


//exportar modulo
 module.exports = ctrl;