const { translate } = require("google-translate-api-x");

// ==========================================
// Traduire un texte
// ==========================================
const translateText = async (text, targetLanguage) => {
    if (!text || !String(text).trim()) {
        return "";
    }

    try {
        const result = await translate(String(text), {
            from: "fr",
            to: targetLanguage
        });

        return result.text;
    } catch (error) {
        console.error(
            `Erreur traduction FR -> ${targetLanguage}:`,
            error.message
        );

        throw error;
    }
};

// ==========================================
// Traduire un tableau de textes
// Exemple : key_features
// ==========================================
const translateArray = async (items, targetLanguage) => {
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    return Promise.all(
        items.map((item) =>
            translateText(item, targetLanguage)
        )
    );
};

// ==========================================
// Traduire un blog FR → EN + MG
// ==========================================
const translateBlog = async ({
    title,
    excerpt,
    content
}) => {
    try {
        console.log("Traduction du blog vers EN...");

        const titleEn = await translateText(title, "en");
        const excerptEn = await translateText(excerpt, "en");
        const contentEn = await translateText(content, "en");

        console.log("Traduction EN terminée");

        console.log("Traduction du blog vers MG...");

        const titleMg = await translateText(title, "mg");
        const excerptMg = await translateText(excerpt, "mg");
        const contentMg = await translateText(content, "mg");

        console.log("Traduction MG terminée");

        return {
            en: {
                title: titleEn,
                excerpt: excerptEn,
                content: contentEn
            },

            mg: {
                title: titleMg,
                excerpt: excerptMg,
                content: contentMg
            }
        };
    } catch (error) {
        console.error(
            "Erreur lors de la traduction du blog :",
            error.message
        );

        throw error;
    }
};

// ==========================================
// Traduire un portfolio FR → EN + MG
// ==========================================
const translatePortfolio = async ({
    title,
    summary,
    challenge,
    solution,
    key_features
}) => {
    try {
        // ==========================================
        // ANGLAIS
        // ==========================================

        console.log("🌍 Traduction portfolio vers EN...");

        const titleEn = await translateText(title, "en");

        const summaryEn = await translateText(
            summary,
            "en"
        );

        const challengeEn = await translateText(
            challenge,
            "en"
        );

        const solutionEn = await translateText(
            solution,
            "en"
        );

        const keyFeaturesEn = await translateArray(
            key_features,
            "en"
        );

        console.log("✅ Traduction portfolio EN terminée");

        // ==========================================
        // MALAGASY
        // ==========================================

        console.log("🌍 Traduction portfolio vers MG...");

        const titleMg = await translateText(title, "mg");

        const summaryMg = await translateText(
            summary,
            "mg"
        );

        const challengeMg = await translateText(
            challenge,
            "mg"
        );

        const solutionMg = await translateText(
            solution,
            "mg"
        );

        const keyFeaturesMg = await translateArray(
            key_features,
            "mg"
        );

        console.log("✅ Traduction portfolio MG terminée");

        // ==========================================
        // RESULTAT
        // ==========================================

        return {
            en: {
                title: titleEn,
                summary: summaryEn,
                challenge: challengeEn,
                solution: solutionEn,
                key_features: keyFeaturesEn
            },

            mg: {
                title: titleMg,
                summary: summaryMg,
                challenge: challengeMg,
                solution: solutionMg,
                key_features: keyFeaturesMg
            }
        };

    } catch (error) {
        console.error(
            "❌ Erreur lors de la traduction du portfolio :",
            error.message
        );

        throw error;
    }
};

module.exports = {
    translateText,
    translateArray,
    translateBlog,
    translatePortfolio
};