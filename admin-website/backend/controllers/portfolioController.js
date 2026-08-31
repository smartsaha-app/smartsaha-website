const models = require("../models");
const deleteImage = require("../services/deleteService");
const {
    translatePortfolio
} = require("../services/translationService");

// =====================================================
// UTILITAIRES
// =====================================================

const getLocale = (req) => {
    const locale = (
        req.query.locale || "fr"
    ).toLowerCase();

    const allowedLocales = ["fr", "en", "mg"];

    return allowedLocales.includes(locale)
        ? locale
        : "fr";
};

const toArray = (value) => {
    if (!value) {
        return [];
    }

    // Déjà un tableau
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    // Chaîne JSON
    // ["a","b","c"]
    if (
        typeof value === "string" &&
        value.trim().startsWith("[")
    ) {
        try {
            const parsed = JSON.parse(value);

            if (Array.isArray(parsed)) {
                return parsed
                    .map((item) => String(item).trim())
                    .filter(Boolean);
            }
        } catch (error) {
            // Continuer avec split
        }
    }

    // Chaîne classique
    // a,b,c
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

module.exports = {

    // =====================================================
    // RÉCUPÉRER TOUS LES PORTFOLIOS
    // =====================================================

    getAllPortfolios: async function (req, res) {

        try {

            const locale = getLocale(req);

            console.log(
                "🌍 Langue demandée pour portfolios :",
                locale
            );

            const includeTranslation = [];

            // Pour EN / MG, récupérer uniquement
            // la traduction demandée
            if (locale !== "fr") {

                includeTranslation.push({

                    model: models.Portfoliotranslate,

                    as: "portfoliotranslates",

                    required: false,

                    where: {
                        language: locale
                    },

                    attributes: [
                        "id",
                        "title",
                        "summary",
                        "challenge",
                        "solution",
                        "key_features",
                        "language",
                        "portfolio_id"
                    ]
                });
            }

            const portfolios =
                await models.Portfolio.findAll({

                    include: includeTranslation,

                    order: [
                        ["createdAt", "DESC"]
                    ]
                });

            // =====================================================
            // CONSTRUCTION SELON LA LANGUE
            // =====================================================

            const translatedPortfolios =
                portfolios.map((portfolio) => {

                    const portfolioData =
                        portfolio.toJSON();

                    let title =
                        portfolioData.title;

                    let summary =
                        portfolioData.summary;

                    let challenge =
                        portfolioData.challenge;

                    let solution =
                        portfolioData.solution;

                    let key_features =
                        portfolioData.key_features;

                    // ==========================================
                    // EN / MG
                    // ==========================================

                    if (locale !== "fr") {

                        const translation =
                            portfolioData
                                .portfoliotranslates
                                ?.find(
                                    (item) =>
                                        item.language === locale
                                );

                        if (translation) {

                            title =
                                translation.title ||
                                title;

                            summary =
                                translation.summary ||
                                summary;

                            challenge =
                                translation.challenge ||
                                challenge;

                            solution =
                                translation.solution ||
                                solution;

                            key_features =
                                translation.key_features ||
                                key_features;
                        }
                    }

                    // Ne pas exposer les traductions
                    delete portfolioData.portfoliotranslates;

                    return {
                        ...portfolioData,
                        title,
                        summary,
                        challenge,
                        solution,
                        key_features
                    };
                });

            return res.status(200).json({

                success: true,

                locale,

                message:
                    "Portfolios récupérés avec succès",

                portfolios:
                    translatedPortfolios
            });

        } catch (err) {

            console.error(
                "Erreur récupération portfolios :",
                err
            );

            return res.status(500).json({

                success: false,

                message:
                    "Erreur serveur",

                error:
                    err.message
            });
        }
    },


    // =====================================================
    // AJOUTER UN PORTFOLIO
    // + TRADUCTION AUTOMATIQUE EN / MG
    // =====================================================

    addPortfolio: async function (req, res) {

        let coverImagePublicId = null;

        let galleryImagesPublicIds = [];

        const transaction =
            await models.sequelize.transaction();

        try {

            console.log(
                "========== AJOUT PORTFOLIO =========="
            );

            console.log(
                "BODY :",
                req.body
            );

            console.log(
                "FILES :",
                req.files
            );

            // =================================================
            // CONTENU FRANÇAIS
            // =================================================

            const {
                title,
                summary,
                challenge,
                solution,
                key_features,
                technologies
            } = req.body;

            // ID de l'utilisateur authentifié
            const user_id = req.user.id;

            // =================================================
            // VALIDATION
            // =================================================

            if (
                !title ||
                !summary ||
                !challenge ||
                !solution ||
                !user_id
            ) {

                await transaction.rollback();

                return res.status(400).json({

                    success: false,

                    message:
                        "Veuillez remplir tous les champs obligatoires du portfolio."
                });
            }

            // =================================================
            // VÉRIFIER UTILISATEUR
            // =================================================

            const user =
                await models.User.findByPk(
                    user_id
                );

            if (!user) {

                await transaction.rollback();

                return res.status(404).json({

                    success: false,

                    message:
                        "Utilisateur introuvable"
                });
            }

            // =================================================
            // IMAGE DE COUVERTURE
            // =================================================

            if (
                !req.files ||
                !req.files.cover_image ||
                !req.files.cover_image[0]
            ) {

                await transaction.rollback();

                return res.status(400).json({

                    success: false,

                    message:
                        "Veuillez importer une image de couverture"
                });
            }

            const coverImage =
                req.files.cover_image[0].path;

            coverImagePublicId =
                req.files.cover_image[0].filename;

            // =================================================
            // GALERIE
            // =================================================

            let galleryImages = [];

            if (
                req.files.gallery &&
                req.files.gallery.length > 0
            ) {

                galleryImages =
                    req.files.gallery.map(
                        (file) => file.path
                    );

                galleryImagesPublicIds =
                    req.files.gallery.map(
                        (file) => file.filename
                    );
            }

            // =================================================
            // CONVERSION TABLEAUX
            // =================================================

            const features =
                toArray(key_features);

            const techs =
                toArray(technologies);

            // =================================================
            // CRÉER PORTFOLIO FRANÇAIS
            // =================================================

            const portfolio =
                await models.Portfolio.create({

                    title,

                    summary,

                    cover_image:
                        coverImage,

                    cover_image_public_id:
                        coverImagePublicId,

                    challenge,

                    solution,

                    key_features:
                        features,

                    technologies:
                        techs,

                    gallery:
                        galleryImages,

                    gallery_public_ids:
                        galleryImagesPublicIds,

                    user_id:
                        Number(user_id)

                }, {
                    transaction
                });

            console.log(
                `✅ Portfolio FR créé : ${portfolio.id}`
            );

            // =================================================
            // TRADUCTION AUTOMATIQUE
            // =================================================

            console.log(
                "🌍 Début traduction automatique..."
            );

            const translations =
                await translatePortfolio({

                    title,

                    summary,

                    challenge,

                    solution,

                    key_features: features
                });

            console.log(
                "✅ Traductions générées"
            );

            // =================================================
            // CRÉER TRADUCTION ANGLAISE
            // =================================================

            await models.Portfoliotranslate.create({

                portfolio_id:
                    portfolio.id,

                language:
                    "en",

                title:
                    translations.en.title,

                summary:
                    translations.en.summary,

                challenge:
                    translations.en.challenge,

                solution:
                    translations.en.solution,

                key_features:
                    translations.en.key_features

            }, {
                transaction
            });

            console.log(
                "✅ Traduction EN enregistrée"
            );

            // =================================================
            // CRÉER TRADUCTION MALAGASY
            // =================================================

            await models.Portfoliotranslate.create({

                portfolio_id:
                    portfolio.id,

                language:
                    "mg",

                title:
                    translations.mg.title,

                summary:
                    translations.mg.summary,

                challenge:
                    translations.mg.challenge,

                solution:
                    translations.mg.solution,

                key_features:
                    translations.mg.key_features

            }, {
                transaction
            });

            console.log(
                "✅ Traduction MG enregistrée"
            );

            // =================================================
            // COMMIT
            // =================================================

            await transaction.commit();

            console.log(
                "🎉 Portfolio + traductions enregistrés"
            );

            return res.status(201).json({

                success: true,

                message:
                    "Portfolio et traductions créés avec succès",

                portfolio
            });

        } catch (err) {

            // =================================================
            // ROLLBACK
            // =================================================

            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error(
                    "Erreur rollback :",
                    rollbackError.message
                );
            }

            // =================================================
            // SUPPRESSION DES IMAGES
            // =================================================

            try {

                if (coverImagePublicId) {

                    await deleteImage(
                        coverImagePublicId
                    );
                }

                if (
                    galleryImagesPublicIds.length > 0
                ) {

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

                success: false,

                message:
                    "Erreur serveur",

                error:
                    err.message
            });
        }
    },


    // =====================================================
    // RÉCUPÉRER UN PORTFOLIO PAR ID
    // =====================================================

    getPortfolioById: async function (req, res) {

        try {

            const { id } =
                req.params;

            const locale =
                getLocale(req);

            console.log(
                `🌍 Portfolio ${id} - langue : ${locale}`
            );

            const includeTranslation = [];

            // =============================================
            // EN / MG
            // =============================================

            if (locale !== "fr") {

                includeTranslation.push({

                    model:
                        models.Portfoliotranslate,

                    as:
                        "portfoliotranslates",

                    required:
                        false,

                    where: {
                        language:
                            locale
                    },

                    attributes: [
                        "id",
                        "title",
                        "summary",
                        "challenge",
                        "solution",
                        "key_features",
                        "language",
                        "portfolio_id",
                        "createdAt",
                        "updatedAt"
                    ]
                });
            }

            const portfolio =
                await models.Portfolio.findByPk(
                    id,
                    {
                        include:
                            includeTranslation
                    }
                );

            if (!portfolio) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Portfolio non trouvé"
                });
            }

            const portfolioData =
                portfolio.toJSON();

            let title =
                portfolioData.title;

            let summary =
                portfolioData.summary;

            let challenge =
                portfolioData.challenge;

            let solution =
                portfolioData.solution;

            let key_features =
                portfolioData.key_features;

            // =============================================
            // TRADUCTION EN / MG
            // =============================================

            if (locale !== "fr") {

                const translation =
                    portfolioData
                        .portfoliotranslates
                        ?.find(
                            (item) =>
                                item.language === locale
                        );

                if (translation) {

                    title =
                        translation.title ||
                        title;

                    summary =
                        translation.summary ||
                        summary;

                    challenge =
                        translation.challenge ||
                        challenge;

                    solution =
                        translation.solution ||
                        solution;

                    key_features =
                        translation.key_features ||
                        key_features;
                }
            }

            // Ne pas envoyer les traductions
            delete portfolioData.portfoliotranslates;

            const translatedPortfolio = {

                ...portfolioData,

                title,

                summary,

                challenge,

                solution,

                key_features
            };

            return res.status(200).json({

                success: true,

                locale,

                message:
                    "Portfolio récupéré avec succès",

                portfolio:
                    translatedPortfolio
            });

        } catch (err) {

            console.error(
                "Erreur récupération portfolio :",
                err
            );

            return res.status(500).json({

                success: false,

                message:
                    "Erreur serveur",

                error:
                    err.message
            });
        }
    },


    // =====================================================
    // SUPPRIMER UN PORTFOLIO
    // =====================================================

    deletePortfolio: async function (req, res) {

        const transaction =
            await models.sequelize.transaction();

        try {

            const { id } =
                req.params;

            const portfolio =
                await models.Portfolio.findByPk(
                    id
                );

            if (!portfolio) {

                await transaction.rollback();

                return res.status(404).json({

                    success: false,

                    message:
                        "Portfolio non trouvé"
                });
            }

            // =================================================
            // SUPPRIMER LES IMAGES
            // =================================================

            const deletePromises = [];

            if (
                portfolio.cover_image_public_id
            ) {

                deletePromises.push(
                    deleteImage(
                        portfolio.cover_image_public_id
                    )
                );
            }

            if (
                portfolio.gallery_public_ids &&
                portfolio.gallery_public_ids.length > 0
            ) {

                deletePromises.push(
                    deleteImage(
                        portfolio.gallery_public_ids
                    )
                );
            }

            await Promise.all(
                deletePromises
            );

            // =================================================
            // SUPPRESSION BDD
            // =================================================

            await portfolio.destroy({
                transaction
            });

            await transaction.commit();

            return res.status(200).json({

                success: true,

                message:
                    "Portfolio supprimé avec succès"
            });

        } catch (err) {

            await transaction.rollback();

            console.error(
                "Erreur suppression portfolio :",
                err
            );

            return res.status(500).json({

                success: false,

                message:
                    "Erreur serveur",

                error:
                    err.message
            });
        }
    }
};