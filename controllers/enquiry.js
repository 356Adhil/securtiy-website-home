const { default: mongoose } = require("mongoose");
const Enquiry = require("../models/Enquiry");

// @desc      CREATE ENQUIRY
// @route     POST /api/v1/enquiry
// @access    private
exports.createEnquiry = async (req, res) => {
    try {
        const response = await Enquiry.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully added enquiry",
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

// @desc      GET ENQUIRY
// @route     GET /api/v1/enquiry
// @access    private
exports.getEnquiry = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await Enquiry.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific enquiry`,
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
            parseInt(skip) === 0 && Enquiry.countDocuments(),
            parseInt(skip) === 0 && Enquiry.countDocuments(query),
            Enquiry.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all enquiry`,
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

// @desc      UPDATE ENQUIRY
// @route     PUT /api/v1/enquiry
// @access    private
exports.updateEnquiry = async (req, res) => {
    try {
        const response = await Enquiry.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific enquiry",
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

// @desc      DELETE ENQUIRY
// @route     DELETE /api/v1/enquiry
// @access    private
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.query.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
