const router = require("express").Router();
// Controllers
const {
    createOurSpeciality,
    getOurSpeciality,
    updateOurSpeciality,
    deleteOurSpeciality,
} = require("../controllers/ourSpeciality");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");
const { getS3Middleware } = require("../middleware/s3client");
const getUploadMiddleware = require("../middleware/upload");

router
    .route("/")
    .post(
        getUploadMiddleware("uploads/ourSpeciality", ["image"]),
        getS3Middleware(["image"]),
        createOurSpeciality
    )
    .get(reqFilter, getOurSpeciality)
    .put(
        getUploadMiddleware("uploads/ourSpeciality", ["image"]),
        getS3Middleware(["image"]), updateOurSpeciality
    )
    .delete(deleteOurSpeciality);

module.exports = router;
