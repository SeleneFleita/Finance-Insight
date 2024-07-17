import { sequelize, DataTypes } from '../bd/basedata.js';

// Modelo para inscripciones
export const Enrollment = sequelize.define('enrollment', {
    enrollment_id: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER(5), 
        allowNull: false,
        references: {
            model: 'client',
            key: 'id_client'
        }
    },
    course_id: {
        type: DataTypes.INTEGER(5),
        allowNull: true, 
        references: {
            model: 'course', 
            key: 'id_course'
        }
    },
    course_b_id: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        references: {
            model: 'course_bank', 
            key: 'id_course_b'
        }
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'completado'),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, { 
    freezeTableName: true,
    underscored: true,
});
