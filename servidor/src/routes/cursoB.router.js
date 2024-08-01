import {Router} from 'express';
import {validarToken} from '../helpers/validar.tokenB.js';
import {crearCourseBank, listarCursos} from '../controllers/course.bank.js';

export const courseB = Router()

//crear curso 
courseB.post('/api/banco/curso/crear',validarToken, crearCourseBank)
//mostrar cursos personales de cada banco
courseB.get('/api/banco/curso/listar',validarToken, listarCursos)


