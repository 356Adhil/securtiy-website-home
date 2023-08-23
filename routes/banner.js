const router = require("express").Router();
// Controllers
const {
    createBanner,
    getBanner,
    updateBanner,
    deleteBanner,
} = require("../controllers/banner");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/banner", ["image"]),
        getS3Middleware(["image"]),
        createBanner
    )
    .get(reqFilter, getBanner)
    .put(
        getUploadMiddleware("uploads/banner", ["image"]),
        getS3Middleware(["image"]), updateBanner
    )
    .delete(deleteBanner);

module.exports = router;
