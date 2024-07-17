import {DataTypes, sequelize} from '../bd/basedata.js';

export const course_category = sequelize.define("course_category", {
    id_category : {
        type : DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey : true
    },
    category : {
        type: DataTypes.ENUM('emprendedor', '', ''),
        allowNull : false
    }
},
{
    freezeTableName : true,
    underscored : true
})