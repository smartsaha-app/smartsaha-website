const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuration Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const createUpload = (folder = "uploads") => {


    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `smartsaha-website/${folder}`,
            allowed_formats: [
                "jpg",
                "jpeg",
                "png",
                "webp"
            ],
            transformation: [
                {
                    width: 1200,
                    height: 1200,
                    crop: "limit"
                }
            ]
        }

    });

    return multer({

        storage,


        limits: {
            fileSize: 5 * 1024 * 1024
        },

        fileFilter: function(req, file, cb) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (allowedTypes.includes(file.mimetype)) {

                cb(null, true);

            } else {

                cb(
                    new Error(
                        "Seuls les fichiers JPEG, PNG et WEBP sont autorisés."
                    ),
                    false
                );

            }

        }

    });


};


module.exports = createUpload;