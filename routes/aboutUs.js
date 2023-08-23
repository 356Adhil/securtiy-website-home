const router = require("express").Router();
// Controllers
const {
    createAboutUs,
    getAboutUs,
    updateAboutUs,
    deleteAboutUs,
} = require("../controllers/aboutUs");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/aboutus", ["image"]),
        getS3Middleware(["image"]),
        createAboutUs
    )
    .get(reqFilter, getAboutUs)
    .put(
        getUploadMiddleware("uploads/aboutus", ["image"]),
        getS3Middleware(["image"]),
        updateAboutUs
    )
    .delete(deleteAboutUs);

module.exports = router;
