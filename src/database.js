//Conexion con la base de datos y se une a index.js
const mongoose = require('mongoose');                       // Modulo para manejar la coneccion a mongo db

mongoose.set("strictQuery", false);                         // desde Mongoose 7 strictQuery sera puesta por defecto en false por loq ue se anade en caso de querer usarlo cambiar el valor a true
//mongoose.connect('mongodb://127.0.0.1:27017/lck',{          // Si la base de datos al conectarse no existe la crea, no usar localhost usar la direccion y el puerto
     
//})
mongoose.connect('mongodb+srv://Xavier:Worldofwarcraft3@lck.mevmnhk.mongodb.net/?retryWrites=true&w=majority',{   // conexion con altras servicio en nube de mongodb gratuito

})
    .then(db => console.log('Base de datos Conectada'))
    .catch(err => console.error(err));