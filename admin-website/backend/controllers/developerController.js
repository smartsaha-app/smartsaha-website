// Imports
const models = require('../models');

// Regex simple pour valider un email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Routes
module.exports = {

    // Récupérer tous les développeurs
    getAllDevelopers: async function(req, res) {
        try {
            const developers = await models.Developer.findAll({
                order: [['name', 'ASC']]
            });

            return res.status(200).json({
                message: "Développeurs récupérés avec succès",
                developers
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Ajouter un développeur
    addDeveloper: async function(req, res) {
        try {
            const { name, email } = req.body;

            // Vérifier si tous les champs sont fournis
            if (!name || !String(name).trim() || !email) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }

            if (!EMAIL_REGEX.test(email)) {
                return res.status(400).json({
                    message: "Email invalide"
                });
            }

            // Vérifier si l'email existe déjà
            const existingDeveloper = await models.Developer.findOne({
                where: { email }
            });

            if (existingDeveloper) {
                return res.status(400).json({
                    message: "Un développeur avec cet email existe déjà"
                });
            }

            const newDeveloper = await models.Developer.create({
                name: String(name).trim(),
                email
            });

            return res.status(201).json({
                message: "Développeur ajouté avec succès",
                developer: newDeveloper
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Modifier un développeur
    updateDeveloper: async function(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const developer = await models.Developer.findByPk(id);

            if (!developer) {
                return res.status(404).json({
                    message: "Développeur non trouvé"
                });
            }

            if (email !== undefined) {
                if (!EMAIL_REGEX.test(email)) {
                    return res.status(400).json({
                        message: "Email invalide"
                    });
                }

                // Vérifier que l'email n'est pas utilisé par un autre développeur
                const existingDeveloper = await models.Developer.findOne({
                    where: { email }
                });

                if (existingDeveloper && existingDeveloper.id !== developer.id) {
                    return res.status(400).json({
                        message: "Un développeur avec cet email existe déjà"
                    });
                }

                developer.email = email;
            }

            if (name !== undefined) {
                if (!String(name).trim()) {
                    return res.status(400).json({
                        message: "Le nom ne peut pas être vide"
                    });
                }
                developer.name = String(name).trim();
            }

            await developer.save();

            return res.status(200).json({
                message: "Développeur modifié avec succès",
                developer
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Supprimer un développeur (ses tâches deviennent non assignées)
    deleteDeveloper: async function(req, res) {
        try {
            const { id } = req.params;

            const developer = await models.Developer.findByPk(id);

            if (!developer) {
                return res.status(404).json({
                    message: "Développeur non trouvé"
                });
            }

            await developer.destroy();

            return res.status(200).json({
                message: "Développeur supprimé avec succès"
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
}
