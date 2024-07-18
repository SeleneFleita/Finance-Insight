//REGISTRAR USUARIO CLIENTE


import bcrypt from 'bcrypt';
import {client} from '../model/client.js';
import jwt from 'jsonwebtoken';
//registrar cliente
export const registerClient = async (req, res) => {
    const {nombre_apellido, dni, mail_client, telefono_client, password_client} = req.body;
    try {
        //verifica si ya existe
    const clientExist = await client.findOne( {where : {
        dni: dni,
        mail_client : mail_client
    }}) 
        if(clientExist){
            //msg si ya existe
            return res.status(404).json({message:'El usuario que intenta registrar ya se encuentra en nuestro sistema'})
        }
        //encriptacion 
        const password = await bcrypt.hash(password_client, 5)
        //estructura del nuevo cliente
        //creacion del usuario 
        const newClient = client.create( {
            nombre_apellido,
            dni,
            mail_client,
            telefono_client,
            password_client : password
        }
        );
        //generar token
        const token = jwt.sign({id_client: newbank.id_client}, 'my_secret' , { expiresIn: '1h'});

        //respuesta al usuario
            res.status(201).json({
                status: 201,
                message : 'Usuario creado correctamente',
                token,
                usuario: newClient,
            })
    } catch (error) {
        //msq si ocurre un error
    res.status(500).send('se produjo un error', error)
    }
}

//editar usuario
export const editarDatosCliente = async (req, res) => {
    const id = +req.params.id_client
    const  {nombre_apellido, mail_client, telefono_client} = req.body;
    
    try {
        const cliente = await client.findByPk(id)
        if(!client){
            return res.status(404).json({message: 'El usuario que desea editar no existe'})
        }
    client.nombre_apellido = nombre_apellido;
    client.mail_client = mail_client;
    client.telefono_client = telefono_client;

    await cliente.save();

    res.json({message: 'El usuario ha sido editado exitosamente', cliente})

    } catch (error) {
        res.status(500).json({message: 'Se produjo un error', error})
    }
}


export const editarContraseniaClient = async (req, res) => {
    const id = +req.params.id_client; // Suponiendo que el id del cliente viene como parte de la URL, por ejemplo, /clientes/:id/editar-contrasenia
    const { new_password, password } = req.body;

    try {
        // Buscar al cliente por su ID
        const editarCliente = await Cliente.findByPk(id);
        // Verificar si el cliente existe
        if (!editarCliente) {
            return res.status(404).json({ message: 'Usuario no encontrado en nuestro sistema' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada usando bcrypt
        const contrasenaCoincide = await bcrypt.compare(password, editarCliente.password_client);
        if (!contrasenaCoincide) {
            return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
        }

        // Generar el hash de la nueva contraseña
        const hashnewp = await bcrypt.hash(new_password, 10); // Usar un factor de costo adecuado (ej. 10)

        // Actualizar la contraseña del cliente con la nueva contraseña hasheada
        editarCliente.password_client = hashnewp;
        await editarCliente.save();
        res.json({ message: 'Contraseña editada correctamente' });
    } catch (error) {
        console.error('Error al editar la contraseña:', error);
        res.status(500).json({ message: 'Se produjo un error al editar la contraseña', error });
    }
};

export const eliminarCliente = async (req, res) => {
    const id = +req.params.id_client;
    try {
        const usuEliminar = await client.findByPk(id)
        if (!usuEliminar) {
            return res.status(404).json('El usuario que desea eliminar no ha sido encontrado en el sistema')
        }
        await usuEliminar.destroy()
        res.json({message: 'El usuario ha sido eliminado'})
    } catch (error) {
        res.status(500).json({message: 'Se produjo un error', error})
    }
}