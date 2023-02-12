const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new localStrategy({                                        // aqui usaremos el passport para poder autenticar localmente el usuario
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: "Usuario no Econtrado"});      // los tres parametros son null en caso de no ecnontrar error, false en caso de no encontrar usuario y el mensaje
    }else{
       const match = await user.matchPassword(password);
       if(match){
        return done(null, user);
       }else {
        return done(null, false, {message: "Datos incorrectos"});
       }
    }
}));


passport.serializeUser((user, done) => {                            // Metodo passport para almacenar estos datos en una sesion para que no tenga que estar autenticandose a cada momento
    done(null, user.id);
});


passport.deserializeUser((id, done) =>{                             // Metodo para el inverso es decir buscar en la sesion el usuario con ese id 
 User.findById(id, (err,user) => {
    done(err, user);
 });
});