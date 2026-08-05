// Imports
const uploadLocal = require("../middleware/uploadLocal");
const uploadCloudinary = require("../middleware/uploadCloudinary");

const service = process.env.UPLOAD_SERVICE;
console.log("Service d'upload utilisé :", service);

let uploadService;


// Choix du stockage
if (service === "Cloudinary") {

    uploadService = uploadCloudinary;

} else {

    uploadService = uploadLocal;

}


module.exports = uploadService;