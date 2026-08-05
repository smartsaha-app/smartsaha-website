// Charger les variables d'environnement en premier
const dotenv = require('dotenv');
dotenv.config();

// Import des dépendances
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { router } = require('./router');


// Création de l'application Express
const app = express();


// Configuration de cookie-parser
app.use(cookieParser());


// Configuration JSON
app.use(bodyParser.json());


// Route test
app.get('/', function (req, res){
    res.send('Bienvenue sur l\'API de l\'administration du site web !');
});


// Routes API
app.use('/api', router);

// Middleware de gestion d'erreurs (doit être défini APRÈS les routes)
// app.use((err, req, res, next) => {
//     console.error("=== ERREUR CAPTURÉE ===");
//     console.error("Type:", err && err.constructor && err.constructor.name);
//     console.error("Message:", err && err.message);
//     console.error("HTTP code (Cloudinary):", err && err.http_code);
//     console.error("Détail complet:", JSON.stringify(err, null, 2));
//     if (err && err.stack) console.error(err.stack);
//     console.error("========================");

//     res.status(500).json({
//         message: (err && err.message) || "Erreur serveur"
//     });
// });


// Démarrage serveur
app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});