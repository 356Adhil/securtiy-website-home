const { default: mongoose } = require("mongoose");
const Banner = require("../models/Banner");

// @desc      CREATE NEW BANNER
// @route     POST /api/v1/banner
// @access    protect
exports.createBanner = async (req, res) => {
    try {
        const newBanner = await Banner.create(req.body);
        res.status(200).json({
            success: true,
            message: "Banner created successfully",
            data: newBanner,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

// @desc      GET ALL BANNER
// @route     GET /api/v1/banner
// @access    public
exports.getBanner = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await Banner.findById(id);
            return res.status(200).json({
                success: true,
                message: "Retrieved specific banner",
                response,
            });
        }
        const query = searchkey
            ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
            : req.filter;
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && Banner.countDocuments(),
            parseInt(skip) === 0 && Banner.countDocuments(query),
            Banner.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50)
                .sort({ _id: -1 }),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all banner`,
            response: data,
            count: data.length,
            totalCount: totalCount || 0,
            filterCount: filterCount || 0,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
};

// @desc      UPDATE SPECIFIC BANNER
// @route     PUT /api/v1/banner/:id
// @access    protect
exports.updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Banner updated successfully",
            data: banner,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

// @desc      DELETE SPECIFIC BANNER
// @route     DELETE /api/v1/banner/:id
// @access    protect
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.query.id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
