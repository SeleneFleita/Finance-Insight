import {Router} from 'express';
import {loginClient, registerClient} from '../controllers/client.js';

//creamos y exportamos rC
export const routerClient = Router()

//ruta para logearse
routerClient.get('/api/loginclient', loginClient);

//ruta para registrar usuario
routerClient.post('/api/registerclient', registerClient)