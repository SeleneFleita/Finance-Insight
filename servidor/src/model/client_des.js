//descripcion del cliente 

import {sequelize, DataTypes} from '../bd/basedata.js';

export const client_des = sequelize.define('client_des', {
    id_des : {
        type : DataTypes.INTEGER(5),
        autoIncrement : true,
        primaryKey : true
    },
    id_client :{
        type : DataTypes.INTEGER(5),
        allowNull: false,
        references : {
            model : 'client',
            key : 'id_client'
        }
    },
    description: {
        type: DataTypes.STRING(250),
    },
    objetive : {
        type: DataTypes.STRING(150)
    },
    occupation : {
    type : DataTypes.ENUM('estudiante', 'empleado', 'desempleado', '')
    } },
    {
        underscored: true,
        freezeTableName: true,
    }

)