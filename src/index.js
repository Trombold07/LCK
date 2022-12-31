// Clase principal de la app

const express = require('express');                                     // modulo para manejar el html
const path = require('path');                                           // modulo para manejar los paths o rutas
const exphbs = require('express-handlebars');                           // modulo para express-handlebars
const methodOverride = require('method-override');                      // modulo para manejar inputs extra como put y delete
const session =require('express-session');                              // modulo para maneajr sessiones

//inicializacion de variales
const app = express();
require('./database');                                                  // Se Requiere e inicializa la conexion a la BD

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


// Global Variables se colocan datos que toda la app requiera

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
