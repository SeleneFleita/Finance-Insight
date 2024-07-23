import {Router} from 'express';
import {loginBank, registerBank} from '../controllers/bank.js';

//exportamos las rutas del banco
export const bankRouter = Router()

//ruta para logearse
bankRouter.get('/api/login', loginBank )

//ruta para registrarse 
bankRouter.post('/api/register', registerBank)


