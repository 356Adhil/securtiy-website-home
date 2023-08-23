const router = require("express").Router();
// Controllers
const {
    createDisplayCount,
    getDisplayCount,
    updateDisplayCount,
    deleteDisplayCount,
} = require("../controllers/displayCount");
// Middleware
const { protect, authorize } = require("../middleware/auth");
const { reqFilter } = require("../middleware/filter");

router
    .route("/")
    .post(createDisplayCount)
    .get(reqFilter, getDisplayCount)
    .put(updateDisplayCount)
    .delete(deleteDisplayCount);

module.exports = router;
