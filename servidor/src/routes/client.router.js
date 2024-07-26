import {Router} from 'express';
import {registerClient, loginClient} from '../controllers/client.js';

//creamos y exportamos rC
export const routerClient = Router()

//ruta para logearse


//ruta para registrar usuario
routerClient.post('/api/client/register', registerClient);

//ruta para logear usuario
routerClient.post('api/client/login', loginClient);