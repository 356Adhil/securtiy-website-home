const router = require("express").Router();
// Controllers
const {
    createOurService,
    getOurService,
    updateOurService,
    deleteOurService,
} = require("../controllers/ourService");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/ourService", ["image"]),
        getS3Middleware(["image"]),
        createOurService
    )
    .get(reqFilter, getOurService)
    .put(
        getUploadMiddleware("uploads/ourService", ["image"]),
        getS3Middleware(["image"]), updateOurService
    )
    .delete(deleteOurService);

module.exports = router;
