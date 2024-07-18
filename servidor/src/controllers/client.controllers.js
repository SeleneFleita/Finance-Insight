//REGISTRAR USUARIO CLIENTE


import bcrypt from 'bcrypt';
import {client} from '../model/client.js';
import jwt from 'jsonwebtoken';
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
        const newClient =client.create( {
            nombre_apellido,
            dni,
            mail_client,
            telefono_client,
            password_client : password
        }
        );
        //generar token
        const token = jwt.sign({id_bank: newbank.id_bank}, 'my_secret' , { expiresIn: '1h'})
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