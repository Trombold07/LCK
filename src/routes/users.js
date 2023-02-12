//URLS  PARA AUTENTICAR
// URLS de las paginas princiales
const express = require('express');                                  // Permite tener un Objeto para la facilitacion de Rutas
const router = express.Router();                                     // Con la variable router podemos crear rutas para el servidor
const User = require('../models/User');
const passport = require('passport');


router.get('/users/signin', (req, res) => {                                 // Ruta de autenticarse
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {      // metodo para autenticar y logear
    successRedirect: '/listkarts',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


router.get('/users/signup', (req, res) => {                                 // Ruta de registro
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {                         // esta ruta sera para guardar los datos de registro en la base de datos mediante el post
    const { nombre, apellido, email, password, password2 } = req.body;    // se crea un objeto con los datos del formulario que llena el usuario
    const errors = [];
    if (nombre.length <= 0) {
        errors.push({ text: 'Ingrese un Nombre por Favor' });
    }
    if (apellido.length <= 0) {
        errors.push({ text: 'Ingrese un Apellido por Favor' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Ingrese un Correo por Favor' });
    }
    if (password.length <= 0) {
        errors.push({ text: 'Ingrese una Contraseña por Favor' });
    }
    if (password != password2) {
        errors.push({ text: 'Las contraseñas no son iguales' });
    }
    if (password.length < 4 && password.length > 15) {
        errors.push({ text: 'Las contraseñas deben ser mayor a 4 caracteres y menor a 15' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            nombre,
            apellido,
            email,
        });        // se manda a llamar al arreglo de errores para que los muestre y se pre carga datos que ya habia llenado para ahorrar tiempo
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('success_msg', 'Ya existe un Usuario con ese Correo');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ nombre, apellido, email, password });
            newUser.password = await newUser.ecryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado exitosamente');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', function (req, res, next){
    req.logout(function(err){
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = router;