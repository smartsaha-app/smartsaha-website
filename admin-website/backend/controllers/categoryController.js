// Imports
const models = require('../models');

// Routes
module.exports = {

    // Récupérer toutes les catégories
    getAllCategories: async function(req, res) {
        try {

            // Récupérer toutes les catégories depuis la base de données
            const categories = await models.Category.findAll();
            return res.status(200).json({
                message: "Catégories récupérées avec succès",
                categories
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Ajouter un catégorie
    addCategory: async function(req, res) {
        try {
            const { name } = req.body;

            // Vérifier si le nom de la catégorie est fourni
            if (!name) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }

            // Vérifier si la catégorie existe déjà
            const existingCategory = await models.Category.findOne({
                where: { name }
            });

            if (existingCategory) {
                return res.status(400).json({
                    message: "Cette catégorie existe déjà"
                });
            }

            // Créer une nouvelle catégorie
            const newCategory = await models.Category.create({
                name
            });

            return res.status(201).json({
                message: "Catégorie ajoutée avec succès",
                category: newCategory
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Supprimer une catégorie
    deleteCategory: async function(req, res) {
        try {

            // Récupérer l'ID de la catégorie à supprimer depuis les paramètres de la requête
            const { id } = req.params;

            const category = await models.Category.findByPk(id);

            // Vérifier si la catégorie existe
            if (!category) {
                return res.status(404).json({
                    message: "Catégorie non trouvée"
                });
            }

            // Supprimer la catégorie
            await models.Category.destroy({
                where: { id }
            });

            return res.status(200).json({
                message: "Catégorie supprimée avec succès"
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
}