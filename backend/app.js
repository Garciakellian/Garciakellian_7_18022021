// declaration des constante requise a l'app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// declaration des router
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/messages');


  // Declaration des header pour eviter les erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Parse le body de la reponse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : "50mb"}));//body parser pour convertir les objets JSON des requêtes POST
app.use(express.json({limit : "50mb"}));
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));

//declaration des route
app.use('/api/', userRoutes);
app.use('/api/', messageRoutes);

module.exports = app;


