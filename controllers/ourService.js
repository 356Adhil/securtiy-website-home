const { default: mongoose } = require("mongoose");
const OurService = require("../models/OurService");

// @desc      CREATE NEW OUR SERVICE
// @route     POST /api/v1/our-service
// @access    private
exports.createOurService = async (req, res) => {
    try {
        const newOurService = await OurService.create(req.body);
        res.status(200).json({
            success: true,
            message: "Our service created successfully",
            data: newOurService,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// @desc      GET OUR SERVICE
// @route     GET /api/v1/our-service/:id
// @access    private
exports.getOurService = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await OurService.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific our service`,
                response,
            });
        }
        const query = {
            ...req.filter,
            ...(searchkey && {
                $or: [{ title: { $regex: searchkey, $options: "i" } },
                { description: { $regex: searchkey, $options: "i" } }],
            }),
        };
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && OurService.countDocuments(),
            parseInt(skip) === 0 && OurService.countDocuments(query),
            OurService.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all our service`,
            response: data,
            count: data.length,
            totalCount: totalCount || 0,
            filterCount: filterCount || 0,
        });
    } catch (err) {
        console.log(err);
        res.status(204).json({
            success: false,
            message: err.toString(),
        });
    }
};

// @desc      UPDATE SPECIFIC OUR SERVICE
// @route     PUT /api/v1/our-service/:id
// @access    private
exports.updateOurService = async (req, res) => {
    try {
        const response = await OurService.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific our service",
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

// @desc      DELETE SPECIFIC OUR SERVICE
// @route     DELETE /api/v1/our-service/:id
// @access    private
exports.deleteOurService = async (req, res) => {
    try {
        const ourService = await OurService.findByIdAndDelete(req.query.id);
        if (!ourService) {
            return res.status(404).json({
                success: false,
                message: "Our service not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Our service deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
