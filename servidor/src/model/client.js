import { sequelize, DataTypes } from "../bd/basedata.js";

export const Client = sequelize.define('client', {
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
        unique: true // Asegura que el DNI sea único
    },
    mail_client: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true // Asegura que el correo electrónico sea único
    },
    telefono_client: {
        type: DataTypes.STRING(15), // Cambiado a STRING porque los números pueden contener caracteres especiales
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

