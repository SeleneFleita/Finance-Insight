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
export const inicioSesionBank = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const existeBanco = await bank.findOne({where: {email : email}})
    if (!existeBanco) {
        return res.status(404).json({message: 'El mail que ingreso no existe en nuestro sistema'})
    }
    const validarPassword = await bcrypt.compare(password, existeBanco.password_bank)
    if (!validarPassword) {
        return res.json({message: 'La contraseña ingresada es incorrecta'})
    }
    const token = jwt.sign({id : existeBanco.id_bank}, 'my_secret')
    res.status(201).json({
        status: 201,
        message : 'usuario banco logeado correctamente ',
        token
    })
    } catch (error) {
        res.status(500).send('se produjo un error', error)
    
    }
    
}
export const editarDatosBanco = async (req, res) => {
    const id = +req.params.id_bank
    const {razon_social, mail_bank, telefono} = req.body
    try {
        const usuEditar = await bank.findByPk(id);
        if (!usuEditar) {
            return res.status(404).json({message: 'El usuario que desea editar no ha sido encontrado'})
        }
        usuEditar.razon_social = razon_social;
        usuEditar.mail_bank = mail_bank;
        usuEditar.telefono = telefono;

        await usuEditar.save()
        res.json({
            message: 'Usuario editado correctamente',
            usuario: usuEditar
        })
    } catch (error) {
        return res.status(505).json({message: 'Se produjo un error', error})
    }
}

export const editarContraseniaBanco = async (req, res) => {
    const id = +req.params.id_bank
    const {new_password , password} = req.body
    try {
        const bankEdit = await bank.findByPk(id);
        if (!bankEdit) {
            return res.status(404).json({message: 'Usuario no encontrado en nuestro sistema'})
        }
        const compconB = bcrypt.compare(password, bankEdit.password_bank);
        if (!compconB) {
            return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
        }
        const hashnewcon = await bcrypt.hash(new_password, 5);
        bankEdit.password_bank = hashnewcon;
        await bankEdit.save()
        res.json({
            message: 'Contraseña editada correctamente'
        })
    } catch (error) {
        res.status(500).json({ message: 'Se produjo un error', error})
    }
}

export const eliminarUsuBank = async (req, res) => {
    const id = +req.param.id_bank;
    try {
        const eliminar = await bank.findByPk(id);
        if (!eliminar) {
            return res.status(404).json({message: 'Usuario no encontrado'})
        }
            
        await eliminar.destroy()
        
        res.json({message: 'El usuario ha sido eliminado'})
        
    } catch (error) {
        return res.status(500).json({message : 'Se produjo un error', error})
    }
}