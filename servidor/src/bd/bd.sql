--crear base de datos

CREATE DATABASE finance_200;

--usar base de datos

use finance_200
--pais
CREATE TABLE country (
    id_country INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
--provincia
CREATE TABLE province (
    id_province INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_country INT UNSIGNED,
    FOREIGN KEY (id_country) REFERENCES country(id_country)
);

--tabla pais y provincia 
CREATE TABLE country_province (
    id_counyprov INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_country INT UNSIGNED,
    id_province INT UNSIGNED,
    FOREIGN KEY (id_country) REFERENCES country(id_country),
    FOREIGN KEY (id_province) REFERENCES province(id_province)
);


-- tabla banco
CREATE TABLE bank (
    id_bank INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('banco', 'administrador', 'cliente') DEFAULT 'banco',
    razon_social VARCHAR(30) NOT NULL,
    cuit INT NOT NULL UNIQUE,
    mail_bank VARCHAR(50) NOT NULL UNIQUE,
    telefono_bank VARCHAR(15),
    id_counyprov INT,
    password_bank VARCHAR(255) NOT NULL, -- Aumentado la longitud para seguridad de la contraseña
    
    FOREIGN KEY (id_counyprov) REFERENCES country_province(id_counyprov)
);
--cliente 
CREATE TABLE client (
    id_client INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('banco', 'administrador', 'cliente') DEFAULT 'cliente',
    nombre_apellido VARCHAR(30) NOT NULL,
    dni INT NOT NULL,
    mail_client VARCHAR(50) NOT NULL UNIQUE,
    telefono_client VARCHAR(15),
    id_counyprov INT,
    password_client VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_counyprov) REFERENCES country_province(id_counyprov)
);
--descripcion del cliente
CREATE TABLE description_client (
    id_description INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_client INT UNSIGNED NOT NULL,
    descripcion VARCHAR(300),
    objetivo VARCHAR(200),
    ocupacion ENUM('estudiante', 'empleado', 'desempleado'),
    FOREIGN KEY (id_client) REFERENCES client(id_client)
);
--administrador 
CREATE TABLE admin (
    id_administrador INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('banco', 'administrador', 'cliente') DEFAULT 'administrador',
    nombre_apellido VARCHAR(30) NOT NULL,
    dni INT NOT NULL,
    mail_admin VARCHAR(50) NOT NULL UNIQUE,
    telefono_admin VARCHAR(15),
    password_admin VARCHAR(255) NOT NULL
);
--pais
CREATE TABLE country (
    id_country INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
--provincia
CREATE TABLE province (
    id_province INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_country INT UNSIGNED,
    FOREIGN KEY (id_country) REFERENCES country(id_country)
);

--tabla pais y provincia 
CREATE TABLE country_province (
    id_counyprov INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_country INT UNSIGNED,
    id_province INT UNSIGNED,
    FOREIGN KEY (id_country) REFERENCES country(id_country),
    FOREIGN KEY (id_province) REFERENCES province(id_province)
);

--curso banco
CREATE TABLE course_bank(
    id_curso_b INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_bank INT UNSIGNED,
    nombre_curso VARCHAR(50),
    img_path VARCHAR(255), -- Almacena la ruta o nombre de la imagen
    duracion INT,
    descripcion VARCHAR(500),
    
    FOREIGN KEY (id_bank) REFERENCES bank(id_bank)
);
--cursos comunes
CREATE TABLE course(
    id_curso INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_curso VARCHAR(50) NOT NULL,
    img_path VARCHAR(255), -- Almacena la ruta o nombre de la imagen
    duracion INT,
    descripcion VARCHAR(500),
    
);
--historial de cursos
CREATE TABLE enrollment (
    id_enrollment INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id INT UNSIGNED,
    course_id INT UNSIGNED,
    course_bank_id INT UNSIGNED,
    estado ENUM ('activo', 'inactivo', 'completado') DEFAULT 'activo',
    fecha_inicio DATETIME,
    FOREIGN KEY (client_id) REFERENCES client(id_client),
    FOREIGN KEY (course_bank_id) REFERENCES course_bank(id_curso),
    FOREIGN KEY (course_id) REFERENCES course(id_curso)
);

