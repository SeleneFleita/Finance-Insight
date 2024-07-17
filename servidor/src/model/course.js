import { sequelize, DataTypes } from "../bd/basedata.js";

export const course = sequelize.define('course', {
id_course: {
    type : DataTypes.INTEGER(5),
    autoIncrement: true,
    primaryKey: true
},
nombre :{
    type : DataTypes.STRING(50)
},
//foto_perfil : {
 //   type : DataTypes.BLOB(),
 //   allowNull: false,
    //hay que utilizar una funcion para poder almacenarlos en este formato
//},
duracion : {
    type : DataTypes.INTEGER(2),
    allowNull: false
},
requisitos : {
    type : DataTypes.STRING(200),
    allowNull : false
},
descripcion : {
    type : DataTypes.STRING(300),
    allowNull : false
}, 
id_category : {
    type : DataTypes.INTEGER(5), 
    allowNull : false,
    references: {
        model : 'course_category',
        key : 'id_category'
    },
nivel : {
    type : DataTypes.STRING(15)
}}},

{
    freezeTableName: true,
    underscored: true,
} 
)