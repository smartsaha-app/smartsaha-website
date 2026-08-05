// Imports
const models = require("../models");
const deleteImage = require("../services/deleteService");

// Routes
module.exports = {

    // =============================
    // Récupérer tous les blogs
    // =============================
    getAllBlogs: async function (req, res) {

        try {

            const blogs = await models.Blog.findAll();

            return res.status(200).json({
                message: "Blogs récupérés avec succès",
                blogs
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    // =============================
    // Ajouter un blog
    // =============================
    addBlog: async function (req, res) {

        let imagePublicId = null;

        const transaction = await models.sequelize.transaction();

        try {

            const {
                title,
                excerpt,
                content,
                categorie_id,
                user_id
            } = req.body;

            // Vérification des champs
            if (
                !title ||
                !excerpt ||
                !content ||
                !categorie_id ||
                !user_id
            ) {

                await transaction.rollback();

                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });

            }

            // Vérification image
            if (!req.file) {

                await transaction.rollback();

                return res.status(400).json({
                    message: "Veuillez importer une image"
                });

            }

            // Vérification catégorie
            const category = await models.Category.findByPk(categorie_id);

            if (!category) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Catégorie introuvable"
                });

            }

            // Vérification utilisateur
            const user = await models.User.findByPk(user_id);

            if (!user) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Utilisateur introuvable"
                });

            }

            // Image
            const image = req.file.path;
            imagePublicId = req.file.filename;

            // Création
            const blog = await models.Blog.create({

                title,
                excerpt,
                content,

                image,
                image_public_id: imagePublicId,

                categorie_id: Number(categorie_id),
                user_id: Number(user_id)

            }, {
                transaction
            });

            await transaction.commit();

            return res.status(201).json({

                message: "Blog créé avec succès",
                blog

            });

        } catch (err) {

            await transaction.rollback();

            // Suppression de l'image si déjà uploadée
            try {

                if (imagePublicId) {

                    await deleteImage(imagePublicId);

                }

            } catch (deleteErr) {

                console.error(
                    "Erreur suppression image :",
                    deleteErr.message
                );

            }

            console.error(
                "ERREUR BLOG :",
                err.message,
                err.stack
            );

            return res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    // =============================
    // Supprimer un blog
    // =============================
    deleteBlog: async function (req, res) {

        const transaction = await models.sequelize.transaction();

        try {

            const { id } = req.params;

            const blog = await models.Blog.findByPk(id);

            if (!blog) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Blog non trouvé"
                });

            }

            // Suppression image
            await deleteImage(
                blog.image_public_id
            );

            // Suppression base
            await blog.destroy({
                transaction
            });

            await transaction.commit();

            return res.status(200).json({

                message: "Blog supprimé avec succès"

            });

        } catch (err) {

            await transaction.rollback();

            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });

        }

    }

};