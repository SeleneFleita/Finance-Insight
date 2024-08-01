import {mostrarTodoslosCursos} from '../controllers/op-cursos.js';
import {Router} from 'express';

export const cursosOp = Router();

cursosOp.get('/api/cursos', mostrarTodoslosCursos)
