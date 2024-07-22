//importamos los modelos
import {bank} from '../model/bank.js';
import {client} from '../model/client.js';
import {CourseBank} from '../model/course.bank.js';
import {course} from '../model/course.js';
import {Enrollment} from '../model/Enrollment.js';
import  { client_des } from '../model/client_des.js';
import {sequelize} from "./basedata.js";


export const createTableAndRelations = async () => {
    //relaciones 
    CourseBank.belongsTo(Bank, { foreignKey: 'id_bank', targetKey: 'id_bank' });
    //creamos los modelos de tablas en la bade de datos
    try {
        await sequelize.sync({force : false})
        console.log('Sincronizado correctamente');
    } catch(error){
    console.log('se produjo un error al sincronizar', error);
    }
}


