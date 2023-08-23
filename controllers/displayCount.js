const { default: mongoose } = require("mongoose");
const DisplayCount = require("../models/DisplayCount");

// @desc      CREATE DISPLAY COUNT
// @route     POST /api/v1/display-count
// @access    private
exports.createDisplayCount = async (req, res) => {
    try {
        const response = await DisplayCount.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully added display count",
            response,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
};

// @desc      GET DISPLAY COUNT
// @route     GET /api/v1/display-count
// @access    private
exports.getDisplayCount = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await DisplayCount.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific display count`,
                response,
            });
        }
        const query = {
            ...req.filter,
            ...(searchkey && {
                $or: [
                    { yearsInBusiness: { $regex: searchkey, $options: "i" } },
                    { totalGuards: { $regex: searchkey, $options: "i" } },
                ],
            }),
        };
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && DisplayCount.countDocuments(),
            parseInt(skip) === 0 && DisplayCount.countDocuments(query),
            DisplayCount.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all display count`,
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

// @desc      UPDATE DISPLAY COUNT
// @route     PUT /api/v1/display-count
// @access    private
exports.updateDisplayCount = async (req, res) => {
    try {
        const response = await DisplayCount.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific display count",
            enrollment: response,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
};

// @desc      DELETE DISPLAY COUNT
// @route     DELETE /api/v1/display-count
// @access    private
exports.deleteDisplayCount = async (req, res) => {
    try {
        const displayCount = await DisplayCount.findByIdAndDelete(req.query.id);
        if (!displayCount) {
            return res.status(404).json({
                success: false,
                message: "Display count not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Display count deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
