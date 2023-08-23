const router = require("express").Router();
// Controllers
const {
    createCareer,
    getCareer,
    updateCareer,
    deleteCareer,
} = require("../controllers/career");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/career", ["files"]),
        getS3Middleware(["files"]),
        createCareer
    )
    .get(reqFilter, getCareer)
    .put(
        getUploadMiddleware("uploads/career", ["files"]),
        getS3Middleware(["files"]),
        updateCareer
    )
    .delete(deleteCareer);

module.exports = router;
