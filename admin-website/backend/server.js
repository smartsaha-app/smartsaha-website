// Charger les variables d'environnement en premier
const dotenv = require('dotenv');
dotenv.config();

// Import des dépendances
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { router } = require('./router');


// Création de l'application Express
const app = express();


// Configuration de cookie-parser
app.use(cookieParser());

// Configuration CORS pour autoriser l'envoi de cookies cross-origin
app.use(cors({
  origin: process.env.CORS_ORIGIN_URL, // URL exacte du frontend Next.js
  credentials: true, // Permet l'envoi des cookies HTTP-Only
}));

// Configuration JSON
app.use(bodyParser.json());


// Route test
app.get('/', function (req, res){
    res.send('Bienvenue sur l\'API de l\'administration du site web !');
});


// Routes API
app.use('/api', router);


// Démarrage serveur
app.listen(process.env.LISTEN_PORT, () => {
    console.log('Serveur démarré sur le port 3001');
});