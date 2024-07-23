// validarToken.js

import jwt from 'jsonwebtoken';

export const validarToken = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization;

    // Verificar si existe el token
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, 'mi_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        // Verificar el rol del usuario
        if (decoded.role !== 'banco') {
            return res.status(403).json({ message: 'Acceso denegado. No tienes permisos para realizar esta acción.' });
        }

        //continuar con la solicitud si es correcto
        req.id_bank = decoded.id;  
        next();
    });
};


