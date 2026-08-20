const { Blogtranslate } = require("../models");

const create = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      language,
      blog_id,
    } = req.body;

    // Vérification des champs obligatoires
    if (!blog_id || !language || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "blog_id, locale, title et content sont obligatoires.",
      });
    }

    // Vérifier la langue
    const allowedLocales = ["en", "mg"];

    if (!allowedLocales.includes(language)) {
      return res.status(400).json({
        success: false,
        message: "La langue doit être 'en' ou 'mg'.",
      });
    }

    // Vérifier si la traduction existe déjà
    const existingTranslation = await Blogtranslate.findOne({
      where: {
        blog_id,
        language,
      },
    });

    if (existingTranslation) {
      return res.status(409).json({
        success: false,
        message: `La traduction ${language} existe déjà pour ce blog.`,
      });
    }

    // Création de la traduction
    const translation = await Blogtranslate.create({
      title,
      excerpt: excerpt || null,
      content,
      language,
      blog_id,
    });

    return res.status(201).json({
      success: true,
      message: "Traduction du blog créée avec succès.",
      data: translation,
    });

  } catch (error) {
    console.error(
      "Erreur lors de la création de la traduction du blog :",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

module.exports = {
  create,
};