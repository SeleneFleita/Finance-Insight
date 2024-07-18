//REGISTRAR USUARIO BANCO

import bcrypt from 'bcrypt';
import {bank} from '../model/bank.js';
import jwt from '../helpers/generarJWT.js';

export const registerBank = async (req, res) => {
    const {razon_social, cuit, mail_bank, telefono, password_bank} = req.body;

    try {
        //verifica si ya existe
        const bankExist = await bank.findOne({where: {cuit : cuit}})
        if(bankExist){
            return res.status(404).json({message : 'El usuario que desea registrar ya existe en nuestro sistema'});

        }
        //encripta la contraseña
        const password = await bcrypt.hash(password_bank, 5);
        //modelo de usuario
        const newbank = await bank.create( {
            razon_social,
            cuit,
            mail_bank,
            telefono,
            password_bank : password
        })

        //creacion de token 
        const token = jwt.sign({id_bank: newbank.id_bank}, 'my_secret' , { expiresIn: '1h'})

        //respuesta posterior a su creacion
        res.status(201).json({
            status: 201,
            message : 'usuario banco creado correctamente ',
            token,
            Nuevo_usuario: newbank
        })
    } catch (error) {
        //msg en caso de error
        res.status(500).send('se produjo un error', error)
    }
}