// Imports
const jwt = require('jsonwebtoken');
const JWT_SECRET = `${process.env.JWT_SECRET}`; // Clé secrète pour signer le token (à stocker dans un fichier .env)

// Fonction pour générer un token JWT
module.exports = {
    generateToken: function(user) {

        // Définir la charge utile du token (payload)
        const payload = {
            id: user.id,
            username: user.username
        };

        // Générer le token
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    },

    decodeToken: function(token) {
        try {
            // Vérifier et décoder le token
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (err) {
            console.error("Erreur lors de la vérification du token:", err);
            return null;
        }
    }
}