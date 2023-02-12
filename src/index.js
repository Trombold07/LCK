// Clase principal de la app

const express = require('express');                                     // modulo para manejar el html
const path = require('path');                                           // modulo para manejar los paths o rutas
const exphbs = require('express-handlebars');                           // modulo para express-handlebars
const methodOverride = require('method-override');                      // modulo para manejar inputs extra como put y delete
const session =require('express-session');                              // modulo para maneajr sessiones
const flash = require('connect-flash');
const passport = require('passport');


//inicializacion de variales
const app = express();
require('./database');                                                  // Se Requiere e inicializa la conexion a la BD
require('./config/passport');                                           // Se inicializa el modulo de autenticacion de passport

// Setting donde nestaran todas las configuraciones
app.set('port', process.env.PORT  || 5000);                             // se configura el puerto a usar si obtiene uno de la nube lo toma caso contrario se usa el 5000
app.set('views', path.join(__dirname, 'views'));                        // aqui le decimos a node que la carpeta views esta dentro de src
app.engine('.hbs', exphbs.engine({                                             // estas propiedades que se le da al handlebars seran para ver como se manejaran las vistas
    defaultLayaout: 'main',                                             // Parte base de la vista html en la app
    layoutsDir: path.join(app.get('views'), 'layouts'),                 // en esta parte se obtiene la direccion de la carpeta views y se concatena con layouts
    partialsDir: path.join(app.get('views'), 'partials'),               // Partes especificas para reusar de las vistas
    extname: '.hbs'                                                     // Sirve para colocar que extension tendran nuestros archivos
}));

app.set('view engine', '.hbs')                                          // aqui se aplica el uso o la configuracion del motor de vistas es decir el .hbs

// Middlewares iran todas las fuynciones que seran ejectuadas antes de llegar al servidor o pasar a las rutas
app.use(express.urlencoded({extended: false}));                         // Sirve para cuando en el formulario me envian datos se puedan entender es decir recibir
app.use(methodOverride('_method'));                                     // Sirve para que en los formularios se puedan enviar otros tipos de metodos a parte del get y el post como put o delete
app.use(session({                                                       // esto nos permitira autenticar a los usuarios y modificarlos esto temporalmente
    secret: 'lck',  
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());                                         // se inicializa passport y este siempre debe ir luego del session
app.use(passport.session());

app.use(flash());                                                       // declaracion de flash para el uso en la pagina para mensajes de alertas este debe ir luego de session y passport

// Global Variables se colocan datos que toda la app requiera
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');                  // Mensaje global de exito
    res.locals.error_msg = req.flash('error_msg');                      // Mensaje global de error
    res.locals.error = req.flash('error');                              // por que el mensaje globar de passport para flash se llama error 
    res.locals.user = req.user || null;                                         // datos del usuario que se logea flash los almacena y podmeos acceder a esos datos
    next();                                                             // Asegurarse de ejecutar el next() para que pase a las siguientes lineas de codigo
});

//Routes las rutas del proyecto
app.use(require('./routes/index'));                                     // Aqui usamos las rutas ya sea de index kart o users
app.use(require('./routes/kart'));
app.use(require('./routes/users'));




//Static Files carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));



//Server Init aqui se iniciara el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on Port', app.get('port'));
});
