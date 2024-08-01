// validarToken.js

import jwt from 'jsonwebtoken';

export const validarToken = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    console.log("Token extraído: ", token);

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET || 'my_secret', (err, decoded) => {
        if (err) {
            console.error("Error de verificación de token:", err);
            return res.status(401).json({ message: 'Token inválido.' });
        }

        console.log("Token decodificado:", decoded);

        // Verificar el rol del usuario
        if (decoded.role !== 'banco') {
            return res.status(403).json({ message: 'Acceso denegado. No tienes permisos para realizar esta acción.' });
        }

        console.log("Rol verificado, permitiendo acceso.");
        // Continuar con la solicitud si es correcto
        req.id_bank = decoded.id;
        next();
    });
};


