// Imports
const models = require("../models");
const deleteImage = require("../services/deleteService");

// Fonction utilitaire
const toArray = (value) => {

    if (!value) return [];

    return value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

};

module.exports = {

    // =============================
    // Récupérer tous les portfolios
    // =============================
    getAllPortfolios: async function (req, res) {

        try {

            const portfolios = await models.Portfolio.findAll();

            return res.status(200).json({
                message: "Portfolios récupérés avec succès",
                portfolios
            });

        } catch (err) {

            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    // =============================
    // Ajouter un portfolio
    // =============================
    addPortfolio: async function (req, res) {

        let coverImagePublicId = null;
        let galleryImagesPublicIds = [];

        const transaction = await models.sequelize.transaction();

        try {

            console.log("BODY :", req.body);
            console.log("FILES :", req.files);

            const {
                title,
                summary,
                challenge,
                solution,
                key_features,
                technologies,
                user_id
            } = req.body;

            // Vérification des champs obligatoires
            if (
                !title ||
                !summary ||
                !challenge ||
                !solution ||
                !user_id
            ) {

                await transaction.rollback();

                return res.status(400).json({
                    message: "Veuillez remplir tous les champs obligatoires"
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

            // Vérification image de couverture
            if (!req.files || !req.files.cover_image) {

                await transaction.rollback();

                return res.status(400).json({
                    message: "Veuillez importer une image de couverture"
                });

            }

            // Image de couverture
            const coverImage = req.files.cover_image[0].path;
            coverImagePublicId = req.files.cover_image[0].filename;

            // Galerie
            let galleryImages = [];

            if (req.files.gallery) {

                galleryImages = req.files.gallery.map(
                    file => file.path
                );

                galleryImagesPublicIds = req.files.gallery.map(
                    file => file.filename
                );

            }

            // Conversion des tableaux
            const features = toArray(key_features);
            const techs = toArray(technologies);

            // Création
            const portfolio = await models.Portfolio.create({

                title,
                summary,

                cover_image: coverImage,
                cover_image_public_id: coverImagePublicId,

                challenge,
                solution,

                key_features: features,
                technologies: techs,

                gallery: galleryImages,
                gallery_public_ids: galleryImagesPublicIds,

                user_id: Number(user_id)

            }, {
                transaction
            });

            await transaction.commit();

            return res.status(201).json({

                message: "Portfolio créé avec succès",
                portfolio

            });

        } catch (err) {

            await transaction.rollback();

            // Nettoyage des images déjà uploadées
            try {

                if (coverImagePublicId) {

                    await deleteImage(
                        coverImagePublicId
                    );

                }

                if (galleryImagesPublicIds.length > 0) {

                    await deleteImage(
                        galleryImagesPublicIds
                    );

                }

            } catch (deleteErr) {

                console.error(
                    "Erreur suppression images :",
                    deleteErr.message
                );

            }

            console.error(
                "ERREUR PORTFOLIO :",
                err.message,
                err.stack
            );

            return res.status(500).json({
                message: "Erreur serveur"
            });

        }

    },

    // =============================
    // Supprimer un portfolio
    // =============================
    deletePortfolio: async function (req, res) {

        const transaction = await models.sequelize.transaction();

        try {

            const { id } = req.params;

            const portfolio = await models.Portfolio.findByPk(id);

            if (!portfolio) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Portfolio non trouvé"
                });

            }

            // Suppression des images
            await Promise.all([

                deleteImage(
                    portfolio.cover_image_public_id
                ),

                deleteImage(
                    portfolio.gallery_public_ids
                )

            ]);

            // Suppression BDD
            await portfolio.destroy({
                transaction
            });

            await transaction.commit();

            return res.status(200).json({

                message: "Portfolio supprimé avec succès"

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