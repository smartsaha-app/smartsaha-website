const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");


const createUpload = (folder = "uploads") => {

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {

            const uploadPath = path.join("uploads",folder);

            // Création automatique du dossier
            fs.mkdirSync(uploadPath, {
                recursive: true
            });

            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {

            const extension = path.extname(
                file.originalname
            );

            cb(null,`${uuidv4()}${extension}`);
        }

    });


    return multer({

        storage,

        limits: {
            fileSize: 5 * 1024 * 1024 // 5 Mo
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

                cb(new Error("Seuls les fichiers JPEG, PNG et WEBP sont autorisés."),false);

            }

        }

    });

};


module.exports = createUpload;