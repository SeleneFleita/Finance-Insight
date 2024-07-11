import { sequelize, DataTypes } from "../bd/basedata";

export const course = sequelize.define('course', {
id_course: {
    type : DataTypes.INTEGER(5),
    autoIncrement: true,
    primaryKey: true
},
nombre :{
    type : DataTypes.STRING(50)
},
duracion : {
    type : DataTypes.INTEGER(2),
    allowNull: false
},
descripcion : {
    type : DataTypes.STRING(300),
    allowNull : false
}, 
nivel : {
    type : DataTypes.STRING(15)
}},

{
    freezeTableName: true,
} 
)