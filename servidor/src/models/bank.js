import { sequelize, DataTypes, Model } from "../bd/basedata";

export const bank = sequelize.define('bank', {
    id_bank: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    razon_social: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    cuit: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
    },
    mail_bank: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(15), 
        allowNull: false, 
    },
    password_bank: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    underscored: true,
    freezeTableName: true,
});
