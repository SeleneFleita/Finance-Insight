import {sequelize, DataTypes} from '../bd/basedata.js';

export const CourseBank = sequelize.define('course_bank', {
id_course_b : {
    type : DataTypes.INTEGER(5),
    autoIncrement: true,
    primaryKey : true
},
id_bank: {
    type : DataTypes.INTEGER(5),
    allowNull: false,
    references : {
        model : 'bank',
        key : 'id_bank'
    }
},
nombre :{
    type : DataTypes.STRING(50)
},
duracion : {
    type : DataTypes.INTEGER(2),
    allowNull: false
},
descripcion : {
    type : DataTypes.STRING(500),
    allowNull : false
}, 
nivel : {
    underscored: true,
    type : DataTypes.STRING(15)
},
category : {
    type: DataTypes.ENUM('emprendedor', '', ''),
    allowNull : false
},
}
, {
    freezeTableName: true,
    underscored: true,
} 
)