import { sequelize, DataTypes } from "../bd/basedata.js";

export const client = sequelize.define('client', {
    id_client: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    nombre_apellido: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    dni: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
        unique: true },
    mail_client: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true 
    },
    telefono_client: {
        type: DataTypes.STRING(15), 
        allowNull: false,
    },
    password_client: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    underscored: true,
});

