import { sequelize, DataTypes } from '../bd/basedata';

// Modelo para inscripciones
export const Enrollment = sequelize.define('enrollment', {
    id_enrollment: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true
    },
    id_client: {
        type: DataTypes.INTEGER(5), 
        allowNull: false,
        references: {
            model : 'client',
            key : 'id_client'
    },
    id_course: {
        type: DataTypes.INTEGER(5),
        allowNull: true, 
        references: {
            model: 'course', 
            key: 'id_course'
        }
    },
    id_course_b: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
        references: {
            model: 'course_bank', 
            key: 'id_course_b'
        }
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'completado'),
        allowNull : false
    },
    fecha_inicio :{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
} }, { 
    freezeTableName: true,
    underscored: true,
});




