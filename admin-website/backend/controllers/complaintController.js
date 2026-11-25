// Imports
const models = require('../models');

// Inclure les tâches et le développeur assigné
const tasksInclude = [{
    model: models.Task,
    as: 'tasks',
    include: [{ model: models.Developer, as: 'developer', attributes: ['id', 'name', 'email'] }]
}];

// Routes
module.exports = {

    // Récupérer toutes les plaintes (avec leurs tâches)
    getAllComplaints: async function(req, res) {
        try {
            const complaints = await models.Complaint.findAll({
                include: tasksInclude,
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                message: "Plaintes récupérées avec succès",
                complaints
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Récupérer une plainte par son ID
    getComplaintById: async function(req, res) {
        try {
            const { id } = req.params;

            const complaint = await models.Complaint.findByPk(id, {
                include: tasksInclude
            });

            if (!complaint) {
                return res.status(404).json({
                    message: "Plainte non trouvée"
                });
            }

            return res.status(200).json({
                message: "Plainte récupérée avec succès",
                complaint
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Ajouter une plainte
    addComplaint: async function(req, res) {
        try {
            const { title, description, page } = req.body;

            // Vérifier si le titre est fourni
            if (!title || !String(title).trim()) {
                return res.status(400).json({
                    message: "Le titre est obligatoire"
                });
            }

            if (String(title).length > 200) {
                return res.status(400).json({
                    message: "Le titre ne doit pas dépasser 200 caractères"
                });
            }

            if (page && String(page).length > 255) {
                return res.status(400).json({
                    message: "La page ne doit pas dépasser 255 caractères"
                });
            }

            const newComplaint = await models.Complaint.create({
                title: String(title).trim(),
                description,
                page
            });

            return res.status(201).json({
                message: "Plainte ajoutée avec succès",
                complaint: newComplaint
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Supprimer une plainte (ses tâches sont supprimées en cascade)
    deleteComplaint: async function(req, res) {
        try {
            const { id } = req.params;

            const complaint = await models.Complaint.findByPk(id);

            if (!complaint) {
                return res.status(404).json({
                    message: "Plainte non trouvée"
                });
            }

            await complaint.destroy();

            return res.status(200).json({
                message: "Plainte supprimée avec succès"
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
}
