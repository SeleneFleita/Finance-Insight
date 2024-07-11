import { sequelize, DataTypes } from "../bd/basedata";

export const client = sequelize.define('client', ({
    id_client :{
        type : DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    nombreApellido :{
        type : DataTypes.STRING(30),
        allowNull: false,
    },
    dni : {
        type : DataTypes.INTEGER(8),
        allowNull: false,
    },
    mail_client : {
        type : DataTypes.STRING(30),
        allowNull: false,
    },
    password_client : {
        type : DataTypes.STRING(30),
        allowNull: false,
}}, {
    freezeTableName: true,
}

))