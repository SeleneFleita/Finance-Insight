import { Sequelize, Model, DataTypes } from 'sequelize';

// Configuración de Sequelize 
export const sequelize = new Sequelize(
    "finance",      
    "root",      
    "",  
    {
        host: "localhost",      
        dialect: 'mysql'                
    }
);

// Función para conectar a la base de datos
export const conectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}
conectionDB()

export { Model, DataTypes }

