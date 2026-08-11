// Imports
const deleteLocal = require("./deleteLocal");
const deleteCloudinary = require("./deleteCloudinary");

let deleteService;

if (process.env.UPLOAD_SERVICE === "Cloudinary") {
    deleteService = deleteCloudinary;
} 
else {
    deleteService = deleteLocal;
}

module.exports = deleteService;