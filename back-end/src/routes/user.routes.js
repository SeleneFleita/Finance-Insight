const {registerNormal, registerBanco} = require("../controllers/users.controllers");
const router = require("express").Router();
const path = require('path');

// Ruta para registrar usuario normal
router.post('/register', registrarNormal);

// Ruta para registrar usuario de banco
router.post('/register', registrarBanco);

// Ruta para servir el archivo register.js desde front-end/assets/js
router.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/assets/js/register'));
});

module.exports = router;

