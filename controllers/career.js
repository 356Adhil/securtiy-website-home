const { default: mongoose } = require("mongoose");
const Career = require("../models/Career");

// @desc      CREATE CAREER
// @route     POST /api/v1/career
// @access    private
exports.createCareer = async (req, res) => {
    try {
        const response = await Career.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully added career",
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

// @desc      GET CAREER
// @route     GET /api/v1/career
// @access    private
exports.getCareer = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await Career.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific career`,
                response,
            });
        }
        const query = {
            ...req.filter,
            ...(searchkey && {
                $or: [
                    { name: { $regex: searchkey, $options: "i" } },
                    { email: { $regex: searchkey, $options: "i" } },
                ],
            }),
        };
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && Career.countDocuments(),
            parseInt(skip) === 0 && Career.countDocuments(query),
            Career.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all career`,
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

// @desc      UPDATE CAREER
// @route     PUT /api/v1/career
// @access    private
exports.updateCareer = async (req, res) => {
    try {
        const response = await Career.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific career",
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

// @desc      DELETE CAREER
// @route     DELETE /api/v1/career
// @access    private
exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.query.id);
        if (!career) {
            return res.status(404).json({
                success: false,
                message: "Career not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Career deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
