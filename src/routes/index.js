// URLS de las paginas princiales
const express = require('express');                                 // Permite tener un Objeto para la facilitacion de Rutas
const router = express.Router();                                    // Con la variable router podemos crear rutas para el servidor


router.get('/', (req, res) =>{                                      // Ruta de la pagina Principal Index
    res.render('index');
});

router.get('/about', (req, res) =>{                                      // Ruta de la pagina about
    res.render('about');
});


module.exports = router;