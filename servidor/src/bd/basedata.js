import mysql from 'mysql2/promise';

export const conexionBD = async ()=> {
    try {
        await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "", 
            database: "finance"
        })
        console.log("conexion a la base de datos exitosas");
    } catch (error) {
        console.log("Se produjo un error", error);
    }
}