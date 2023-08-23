const router = require("express").Router();
// Controllers
const {
    createOurTeam,
    getOurTeam,
    updateOurTeam,
    deleteOurTeam,
} = require("../controllers/ourTeam");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/ourTeam", ["image"]),
        getS3Middleware(["image"]),
        createOurTeam
    )
    .get(reqFilter, getOurTeam)
    .put(
        getUploadMiddleware("uploads/ourTeam", ["image"]),
        getS3Middleware(["image"]), updateOurTeam
    )
    .delete(deleteOurTeam);

module.exports = router;
