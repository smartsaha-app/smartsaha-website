// Imports
const models = require('../models');

// Statuts autorisés (doivent correspondre à l'ENUM task_status)
const TASK_STATUSES = ['not_started', 'in_progress', 'done'];

// Routes
module.exports = {

    // Récupérer toutes les tâches
    // Filtres optionnels : ?status=...&complaint_id=...&developer_id=...
    getAllTasks: async function(req, res) {
        try {
            const { status, complaint_id, developer_id } = req.query;
            const where = {};

            if (status) {
                if (!TASK_STATUSES.includes(status)) {
                    return res.status(400).json({
                        message: "Statut invalide"
                    });
                }
                where.status = status;
            }
            if (complaint_id) where.complaint_id = complaint_id;
            if (developer_id) where.developer_id = developer_id;

            const tasks = await models.Task.findAll({
                where,
                include: [
                    { model: models.Complaint, as: 'complaint', attributes: ['id', 'title', 'page'] },
                    { model: models.Developer, as: 'developer', attributes: ['id', 'name', 'email'] }
                ],
                order: [['created_at', 'DESC']]
            });

            return res.status(200).json({
                message: "Tâches récupérées avec succès",
                tasks
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Ajouter une tâche à une plainte
    addTask: async function(req, res) {
        try {
            const { complaint_id, developer_id, title, status } = req.body;

            // Vérifier les champs obligatoires
            if (!complaint_id || !title || !String(title).trim()) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }

            if (status && !TASK_STATUSES.includes(status)) {
                return res.status(400).json({
                    message: "Statut invalide"
                });
            }

            // Vérifier que la plainte existe
            const complaint = await models.Complaint.findByPk(complaint_id);
            if (!complaint) {
                return res.status(404).json({
                    message: "Plainte non trouvée"
                });
            }

            // Vérifier que le développeur existe (si fourni)
            if (developer_id) {
                const developer = await models.Developer.findByPk(developer_id);
                if (!developer) {
                    return res.status(404).json({
                        message: "Développeur non trouvé"
                    });
                }
            }

            const newTask = await models.Task.create({
                complaint_id,
                developer_id: developer_id || null,
                title: String(title).trim(),
                status: status || 'not_started'
            });

            return res.status(201).json({
                message: "Tâche ajoutée avec succès",
                task: newTask
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Modifier une tâche (titre, développeur assigné, statut)
    updateTask: async function(req, res) {
        try {
            const { id } = req.params;
            const { title, developer_id, status } = req.body;

            const task = await models.Task.findByPk(id);

            if (!task) {
                return res.status(404).json({
                    message: "Tâche non trouvée"
                });
            }

            if (title !== undefined) {
                if (!String(title).trim()) {
                    return res.status(400).json({
                        message: "Le titre ne peut pas être vide"
                    });
                }
                task.title = String(title).trim();
            }

            if (status !== undefined) {
                if (!TASK_STATUSES.includes(status)) {
                    return res.status(400).json({
                        message: "Statut invalide"
                    });
                }
                task.status = status;
            }

            // developer_id: null => désassigner la tâche
            if (developer_id !== undefined) {
                if (developer_id !== null) {
                    const developer = await models.Developer.findByPk(developer_id);
                    if (!developer) {
                        return res.status(404).json({
                            message: "Développeur non trouvé"
                        });
                    }
                }
                task.developer_id = developer_id;
            }

            await task.save();

            return res.status(200).json({
                message: "Tâche modifiée avec succès",
                task
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Supprimer une tâche
    deleteTask: async function(req, res) {
        try {
            const { id } = req.params;

            const task = await models.Task.findByPk(id);

            if (!task) {
                return res.status(404).json({
                    message: "Tâche non trouvée"
                });
            }

            await task.destroy();

            return res.status(200).json({
                message: "Tâche supprimée avec succès"
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
}
