// Imports
const fs = require("fs/promises");
const path = require("path");


/**
 * Supprime une ou plusieurs images locales
 * @param {String|Array} images chemins des fichiers
 */
const deleteLocal = async (images) => {

    try {

        if (!images) {
            return;
        }


        // Transformer en tableau
        const files = Array.isArray(images)
            ? images
            : [images];


        for (const file of files) {


            if (!file) continue;


            // Chemin absolu
            const filePath = path.resolve(file);


            try {

                await fs.unlink(filePath);

                console.log(
                    "Image supprimée :",
                    filePath
                );


            } catch(err) {

                // Si fichier déjà supprimé
                if (err.code !== "ENOENT") {

                    console.error(
                        "Erreur suppression image :",
                        err.message
                    );

                }

            }

        }


    } catch(err) {

        console.error(
            "Erreur suppression locale :",
            err.message
        );

    }

};

module.exports = deleteLocal;