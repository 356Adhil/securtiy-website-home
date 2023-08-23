const { default: mongoose } = require("mongoose");
const OurTeam = require("../models/OurTeam");

// @desc      CREATE NEW OUR TEAM
// @route     POST /api/v1/our-team
// @access    private
exports.createOurTeam = async (req, res) => {
    try {
        const newOurTeam = await OurTeam.create(req.body);
        res.status(200).json({
            success: true,
            message: "Our team created successfully",
            data: newOurTeam,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// @desc      GET OUR TEAM
// @route     GET /api/v1/our-team/:id
// @access    private
exports.getOurTeam = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await OurTeam.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific our team`,
                response,
            });
        }
        const query = {
            ...req.filter,
            ...(searchkey && {
                $or: [{ name: { $regex: searchkey, $options: "i" } },
                { designation: { $regex: searchkey, $options: "i" } }],
            }),
        };
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && OurTeam.countDocuments(),
            parseInt(skip) === 0 && OurTeam.countDocuments(query),
            OurTeam.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all our team`,
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

// @desc      UPDATE SPECIFIC OUR TEAM
// @route     PUT /api/v1/our-team/:id
// @access    private
exports.updateOurTeam = async (req, res) => {
    try {
        const response = await OurTeam.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific our team",
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

// @desc      DELETE SPECIFIC OUR TEAM
// @route     DELETE /api/v1/our-team/:id
// @access    private
exports.deleteOurTeam = async (req, res) => {
    try {
        const ourTeam = await OurTeam.findByIdAndDelete(req.query.id);
        if (!ourTeam) {
            return res.status(404).json({
                success: false,
                message: "Our team not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Our team deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
