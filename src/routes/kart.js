//URLS del SERVIDOR
const express = require('express');                                 // Permite tener un Objeto para la facilitacion de Rutas
const req = require('express/lib/request');
const res = require('express/lib/response');
const router= express.Router();                                     // Con la variable router podemos crear rutas para el servidor

const Kart = require('../models/Kart');                             // Aqui solicito que se use el modelo Kart con su schema, ademas e puede usar los metodos ya de Kart como update, create etc

router.get('/kart/add', (req, res) =>{                              // Ruta de los karts del piloto
    res.render('karts/newkart');                                    //Es la ruta de la carpeta por eso KARTS
});

router.post('/karts/newkart', async (req, res) =>{                  // Cuando recivo los datos veo como los recivo, el async es para especificar que dentro de la funcion se manejaran tareas asincronas
   const {categoria, numeroKart, descripcion }= req.body;           // Se puede hacer deconstruccion de cada argumento
   const errors = [];
   if (!categoria){
       errors.push({text: 'Categoria no Econtrada'})
   }
   if(!numeroKart){
       errors.push({text: 'El numero no coincide con la categoria'})
   }
   if(!descripcion){
    errors.push({text: 'Escriba una Descripcion'})
}
   if(errors.length>0){
        res.render('karts/newkart', {
           errors,
           categoria,
           numeroKart,
           descripcion
        });
   }else{
        const newKart = new Kart({categoria, numeroKart, descripcion }); // Aqui se genera lo que es el nuevo Kart del piloto
        await newKart.save();                                           // Con el await indico que tomara un tiempo de ejecucion y seguira de manera asincrona
        res.redirect('/listkarts');
        
   }
   
});


router.get('/listkarts', async (req, res) =>{                                      // Ruta de los karts del piloto

     const  karts = await Kart.find({}).lean().sort({date: 'desc'});                // Cuando obteniendo el dato desde moongose falla se puede usar el .lean() para obtener un json directamente recordar que en objeto.find() se debe agregar llaves dentro de los partentecis objeto.find({})
     res.render('karts/listkarts', {karts});                                       // Es la ruta donde se veran los karts de cada piloto
});


router.get('/karts/edit/:id', async (req, res) => {                                // Direccion  de edicion y redirecciona con id a una plantilla con su formulario editKarts/hbs
    const edKart = await Kart.findById(req.params.id).lean();                      // Aqui se pasa el ID que se obtiene del kart y ademas esto es asincrono por eso el uso de async y await
    res.render('karts/editKarts', {edKart});
});

router.put('/karts/editKarts/:id', async (req, res) =>{                                    // Direccion para final de edicion donde se hara el post y se actualizara finalmente
    const {categoria, numeroKart, descripcion} = req.body;
    await Kart.findByIdAndUpdate(req.params.id, {categoria, numeroKart, descripcion}).lean();      
    res.redirect('/listkarts');
});

module.exports = router;