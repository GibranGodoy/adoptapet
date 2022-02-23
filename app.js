const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de base de datos
const mongoose = require('mongoose');




mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

mongoose.set('debug', true)
require('./models/Usuario')
require('./models/Mascota')
require('./models/Solicitud')
require('./config/passport')

//Rutas
app.use('/v1', require('./routes'));

//Iniciando el server
// const PORT = 4001;
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

// const gods = { 
//     Zeus: {
//         live: 'Olympus',
//         symbol: 'Thunderbolt'
//     },
//     Hades: {
//         live: 'Underworld',
//         symbol: 'Cornucopia'
//     }
// };

// const constelaciones = {
//     Andromeda : {
//         abreviatura : 'And',
//         superficie :  722.3,
//         num_estrellas : 152,
//         estr_mas_brillante : 'Alpheratz' 
//     },
//     Corvus : {
//         abreviatura : 'Crv',
//         superficie :  183.8,
//         num_estrellas : 29,
//         estr_mas_brillante : 'Gienah' 
//     },
//     Draco : {
//         abreviatura : 'Dra',
//         superficie :  1083,
//         num_estrellas : 211,
//         estr_mas_brillante : 'Etamin' 
//     },
//     Hidra : {
//         abreviatura : 'Hya',
//         superficie :  1302.8,
//         num_estrellas : 238,
//         estr_mas_brillante : 'Alfrad' 
//     },
//     Pegaso : {
//         abreviatura : 'Peg',
//         superficie :  1120.8,
//         num_estrellas : 177,
//         estr_mas_brillante : 'Enif' 
//     }
// };

// app.get('/gods', (req, res) => {
//     res.send(gods);
// });

// app.get('/gods/:name', (req, res) => {
//     const name = req.params.name;
//     const god = gods[name];
//     if (god) {
//         res.send(god);
//     }
//     else {
//         res.status(404).send('No encontré el Dios')
//     }
// });

// app.put('/gods/:name', (req, res) => {
//     const god = req.params.name;
//     gods[god] = req.body;
//     res.send(gods);
// })

// //Reto 1
// app.get('/constelaciones', (req, res) => {
//     res.send(constelaciones);
// })

// //Reto 2
// app.get('/constelaciones/:attr', (req, res) => {
    
// });

// app.post('/gods', (req, res) => {
//     const name = req.query.name;
//     const info = req.body;
//     gods[name] = info;
//     res.status(200).send(gods);
// });

// app.delete('/gods/:name', (req, res) => {
//     const name = req.params.name;
//     if (delete gods[name]) {
//         res.send(gods)
//     } else {
//         res.status(500)
//     }
// });
