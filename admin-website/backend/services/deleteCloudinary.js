// Imports
const cloudinary = require("cloudinary").v2;


// Configuration Cloudinary

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

    api_key: process.env.CLOUDINARY_API_KEY,

    api_secret: process.env.CLOUDINARY_API_SECRET

});



/**
 * Supprime une ou plusieurs images Cloudinary
 * @param {String|Array} publicIds
 */
const deleteCloudinary = async (publicIds) => {


    try {


        if (!publicIds) {
            return;
        }


        const images = Array.isArray(publicIds)
            ? publicIds
            : [publicIds];

        for (const publicId of images) {

            if (!publicId) continue;

            await cloudinary.uploader.destroy(
                publicId
            );

            console.log(
                "Image Cloudinary supprimée :",
                publicId
            );

        }

    } catch(err) {


        console.error(
            "Erreur suppression Cloudinary :",
            err.message
        );


    }


};

module.exports = deleteCloudinary;