const models = require("../models");
const deleteImage = require("../services/deleteService");

const getLocale = (req) => {
    const locale = req.query.locale || "fr";

    const allowedLocales = ["fr", "en", "mg"];

    return allowedLocales.includes(locale) ? locale : "fr";
};

module.exports = {

    // =====================================================
    // RÉCUPÉRER TOUS LES BLOGS
    // =====================================================
    getAllBlogs: async function (req, res) {

        try {

            const locale = getLocale(req);

            console.log("🌍 Langue demandée :", locale);

            const blogs = await models.Blog.findAll({
                include: [
                    {
                        model: models.Category,
                        as: "category",
                        attributes: ["id", "name"]
                    },
                    {
                        model: models.Blogtranslate,
                        as: "blogtranslates",
                        required: false,
                        where: {
                            language: locale
                        }
                    }
                ],
                order: [["createdAt", "DESC"]]
            });

            // =====================================================
            // CONSTRUCTION DU CONTENU SELON LA LANGUE
            // =====================================================

            const translatedBlogs = blogs.map((blog) => {

                const blogData = blog.toJSON();

                // Français = contenu original
                if (locale === "fr") {

                    return {
                        ...blogData,
                        title: blogData.title,
                        excerpt: blogData.excerpt,
                        content: blogData.content
                    };

                }

                // EN / MG = rechercher la traduction
                const translation = blogData.translations?.find(
                    (item) => item.language === locale
                );

                // Si traduction disponible
                if (translation) {

                    return {
                        ...blogData,

                        title: translation.title,
                        excerpt: translation.excerpt,
                        content: translation.content,

                        // On peut supprimer translations
                        // pour ne pas envoyer toutes les traductions
                        translations: undefined
                    };

                }

                // Fallback vers le français
                return {
                    ...blogData,
                    title: blogData.title,
                    excerpt: blogData.excerpt,
                    content: blogData.content,

                    translations: undefined
                };
            });

            return res.status(200).json({
                success: true,
                locale,
                message: "Blogs récupérés avec succès",
                blogs: translatedBlogs
            });

        } catch (err) {

            console.error(
                "Erreur récupération blogs :",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Erreur serveur"
            });
        }
    },


    // =====================================================
    // AJOUTER UN BLOG
    // =====================================================
    addBlog: async function (req, res) {

        let imagePublicId = null;

        const transaction = await models.sequelize.transaction();

        try {

            const {
                title,
                excerpt,
                content,
                categorie_id
            } = req.body;

            // ID de l'utilisateur authentifié
            const user_id = req.user.id;

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

            if (!req.file) {

                await transaction.rollback();

                return res.status(400).json({
                    message: "Veuillez importer une image"
                });
            }

            const category = await models.Category.findByPk(
                categorie_id
            );

            if (!category) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Catégorie introuvable"
                });
            }

            const user = await models.User.findByPk(
                user_id
            );

            if (!user) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Utilisateur introuvable"
                });
            }

            const image = req.file.path;

            imagePublicId = req.file.filename;

            const blog = await models.Blog.create(
                {
                    title,
                    excerpt,
                    content,
                    image,
                    image_public_id: imagePublicId,
                    categorie_id: Number(categorie_id),
                    user_id: Number(user_id)
                },
                {
                    transaction
                }
            );

            await transaction.commit();

            return res.status(201).json({
                message: "Blog créé avec succès",
                blog
            });

        } catch (err) {

            await transaction.rollback();

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


    // =====================================================
    // RÉCUPÉRER UN BLOG
    // =====================================================
    getBlogById: async function (req, res) {

        try {

            const { id } = req.params;

            const locale = (
                req.query.locale || "fr"
            ).toLowerCase();

            console.log(`🌍 Blog ${id} - langue : ${locale}`);

            const includeTranslation = [];

            // Pour EN / MG, récupérer uniquement
            // la traduction demandée
            if (locale !== "fr") {

                includeTranslation.push({

                    model: models.Blogtranslate,

                    as: "blogtranslates",

                    required: false,

                    where: {
                        language: locale
                    },

                    attributes: [
                        "id",
                        "title",
                        "excerpt",
                        "content",
                        "language",
                        "blog_id",
                        "createdAt",
                        "updatedAt"
                    ]

                });

            }

            const blog = await models.Blog.findByPk(id, {

                include: [

                    {
                        model: models.Category,

                        as: "category",

                        attributes: [
                            "id",
                            "name"
                        ]
                    },

                    ...includeTranslation

                ]

            });

            if (!blog) {

                return res.status(404).json({

                    message: "Blog non trouvé"

                });

            }

            const blogJson = blog.toJSON();

            let title = blogJson.title;
            let excerpt = blogJson.excerpt;
            let content = blogJson.content;

            // =====================================
            // Traduction EN / MG
            // =====================================

            if (locale !== "fr") {

                const translation =
                    blogJson.blogtranslates?.find(
                        item => item.language === locale
                    );

                if (translation) {

                    title =
                        translation.title ||
                        title;

                    excerpt =
                        translation.excerpt ||
                        excerpt;

                    content =
                        translation.content ||
                        content;

                }

            }

            const translatedBlog = {

                ...blogJson,

                title,

                excerpt,

                content

            };

            // On ne renvoie pas les traductions
            delete translatedBlog.blogtranslates;

            return res.status(200).json({

                message: "Blog récupéré avec succès",

                blog: translatedBlog

            });

        } catch (err) {

            console.error(
                "Erreur récupération blog :",
                err
            );

            return res.status(500).json({

                message: "Erreur serveur",

                error: err.message

            });

        }

    },


    // =====================================================
    // SUPPRIMER UN BLOG
    // =====================================================
    deleteBlog: async function (req, res) {

        const transaction =
            await models.sequelize.transaction();

        try {

            const { id } = req.params;

            const blog =
                await models.Blog.findByPk(id);

            if (!blog) {

                await transaction.rollback();

                return res.status(404).json({
                    message: "Blog non trouvé"
                });
            }

            await deleteImage(
                blog.image_public_id
            );

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