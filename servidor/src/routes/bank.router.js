import {Router} from 'express';
import {registerBank, loginBank} from '../controllers/bank.js';

//exportamos las rutas del banco
export const bankRouter = Router()


//ruta para registrarse 
bankRouter.post('/api/bank/register', registerBank)

bankRouter.get('/api/bank/login', loginBank)


