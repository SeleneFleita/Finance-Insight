import {Router} from 'express';
import {validarToken} from '../helpers/validar.tokenB.js';
import {crearCourseBank} from '../controllers/course.bank.js';

export const courseB = Router()

//crear curso 
courseB.post('/api/curso/crear', crearCourseBank)