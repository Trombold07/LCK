const mongoose = require('mongoose');
const {Schema} = mongoose;     
const bcrypt = require ('bcryptjs');


const userSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

userSchema.methods.ecryptPassword = async (password) => {                         // metodo para encriptar contrasenas mediante modulo bcrypt
   const salt = await bcrypt.genSalt(10);
   const hash = bcrypt.hash(password, salt);
   return hash;
};

userSchema.methods.matchPassword = async function (password) {                        // metodo para comparar las contrasenas encriptadas lo que hara es encriptar la contrasena al logear y --
return await bcrypt.compare(password, this.password);                           // comparar con la ya encriptada en la base de datos para ver si son iguales
};


module.exports = mongoose.model('User', userSchema)   // Se exporta para poder usarlo en otras clases y se requieren dos parametros el Usuario y el eschema