const router = require("express").Router();
// Controllers
const {
    createCertificateOfAppreciation,
    getCertificateOfAppreciation,
    updateCertificateOfAppreciation,
    deleteCertificateOfAppreciation,
    // getByFranchise,
} = require("../controllers/certificateOfAppreciation");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/certificate", ["image"]),
        getS3Middleware(["image"]),
        createCertificateOfAppreciation
    )
    .get(reqFilter, getCertificateOfAppreciation)
    .put(
        getUploadMiddleware("uploads/certificate", ["image"]),
        getS3Middleware(["image"]), updateCertificateOfAppreciation
    )
    .delete(deleteCertificateOfAppreciation);

module.exports = router;
