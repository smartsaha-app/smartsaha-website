const {
    Portfoliotranslate,
    Portfolio
} = require("../models");

const create = async (req, res) => {

    try {

        const {
            title,
            summary,
            challenge,
            solution,
            key_features,
            language,
            portfolio_id
        } = req.body;

        // =====================================================
        // VALIDATION
        // =====================================================

        if (
            !portfolio_id ||
            !language ||
            !title ||
            !summary ||
            !challenge ||
            !solution
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "portfolio_id, language, title, summary, challenge et solution sont obligatoires."
            });
        }

        // =====================================================
        // VÉRIFIER LA LANGUE
        // =====================================================

        const allowedLocales = [
            "en",
            "mg"
        ];

        if (
            !allowedLocales.includes(
                language
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "La langue doit être 'en' ou 'mg'."
            });
        }

        // =====================================================
        // VÉRIFIER LE PORTFOLIO
        // =====================================================

        const portfolio =
            await Portfolio.findByPk(
                portfolio_id
            );

        if (!portfolio) {

            return res.status(404).json({

                success: false,

                message:
                    "Portfolio introuvable."
            });
        }

        // =====================================================
        // VÉRIFIER SI LA TRADUCTION EXISTE
        // =====================================================

        const existingTranslation =
            await Portfoliotranslate.findOne({

                where: {
                    portfolio_id,
                    language
                }
            });

        if (existingTranslation) {

            return res.status(409).json({

                success: false,

                message:
                    `La traduction ${language} existe déjà pour ce portfolio.`
            });
        }

        // =====================================================
        // CONVERSION KEY FEATURES
        // =====================================================

        let features = [];

        if (Array.isArray(key_features)) {

            features =
                key_features;

        } else if (
            typeof key_features === "string"
        ) {

            try {

                const parsed =
                    JSON.parse(key_features);

                features =
                    Array.isArray(parsed)
                        ? parsed
                        : [key_features];

            } catch (error) {

                features =
                    key_features
                        .split(",")
                        .map(
                            (item) =>
                                item.trim()
                        )
                        .filter(Boolean);
            }
        }

        // =====================================================
        // CRÉATION
        // =====================================================

        const translation =
            await Portfoliotranslate.create({

                portfolio_id,

                language,

                title,

                summary,

                challenge,

                solution,

                key_features:
                    features

            });

        return res.status(201).json({

            success: true,

            message:
                "Traduction du portfolio créée avec succès.",

            data:
                translation
        });

    } catch (error) {

        console.error(
            "Erreur création traduction portfolio :",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Erreur serveur.",

            error:
                error.message
        });
    }
};

module.exports = {
    create
};