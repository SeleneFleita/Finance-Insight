//importamos los modelos
import {bank} from '../models/bank';
import {client} from '../models/client';
import {course_category} from '../models/course_category';
import {CourseBank} from '../models/course.bank';
import {course} from '../models/course';
import {Enrollment} from '../models/Enrollment';

//relaciones
CourseBank.hasMany(bank, { foreignKey : "id_bank"});