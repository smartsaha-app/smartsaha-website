// Imports
const jwtUtils = require('../utils/jwt.utils');

// Middleware pour vérifier l'authentification
module.exports = async function(req, res, next) {
    try {

        // Récupérer le token dans le cookie
        const token = req.cookies.access_token;

        // Vérifier si le token est présent
        if (!token) {
            return res.status(401).json({
                message: "Token manquant"
            });
        }

        const decodedToken = jwtUtils.decodeToken(token);

        // Vérifier si le token est valide
        if (!decodedToken) {
            return res.status(401).json({
                message: "Token invalide"
            });
        }

        // Ajouter les informations de l'utilisateur à la requête
        req.user = decodedToken;

        // Appeler le controleur suivant
        next();

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};