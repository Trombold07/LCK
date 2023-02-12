//Aqui se ubicaran las normas para tratar los datos
const mongoose = require('mongoose');
const {Schema} = mongoose;                                              // Se crea la variable donde se guardaran los datos del Schema         

const kartSchema = new Schema({                                        // Aqui definimos los parametros para el schema y si son obligatorios o no
    categoria: {type: String, required: true},
    numeroKart:{type: String, required: true},
    descripcion:{type: String, required: true},
    date:{type: Date, default: Date.now},
    user:{type: String}
});


module.exports = mongoose.model('Kart', kartSchema)                    // Se exporta para poder usarlo en otras clases y se requieren dos parametros el kart y  el eschema