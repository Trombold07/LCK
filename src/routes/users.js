//URLS  PARA AUTENTICAR
// URLS de las paginas princiales
const express = require('express');                                  // Permite tener un Objeto para la facilitacion de Rutas
const router = express.Router();                                     // Con la variable router podemos crear rutas para el servidor

router.get('/users/signin', (req, res) =>{                                 // Ruta de autenticarse
    res.render('users/signin');
});

router.get('/users/signup', (req, res) =>{                                 // Ruta de registro
    res.render('users/signup');
});

module.exports = router;