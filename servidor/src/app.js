//IMPORTAMOS 
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//
const app = express();
//FIN

//MIDDLEWARE
app.use(express.json());
app.use(morgan());
app.use(cors());
//FIN MIDDLEWARE


//CONEXION BD
import {pool} from './bd/basedata.js';
pool;

//FIN CONEXION BD

//RUTAS
//importamos
import {bankRouter} from './routes/bank.router.js';
import {routerClient} from './routes/client.router.js';
import {courseB} from './routes/cursoB.router.js';
import {cursosOp} from './routes/op.cursosB.js';
//ponemos en uso
app.use(bankRouter)
app.use(routerClient)
app.use(courseB)
app.use(cursosOp)

//FIN RUTAS


//SERVIDOR 
const port = process.env.PORT || 4000
app.listen(port , console.log("Funcionando en el puerto ", port))
//FIN