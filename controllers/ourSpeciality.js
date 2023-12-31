const { default: mongoose } = require("mongoose");
const OurSpeciality = require("../models/OurSpeciality");

// @desc      CREATE NEW OUR SPECIALITY
// @route     POST /api/v1/our-speciality
// @access    private
exports.createOurSpeciality = async (req, res) => {
    try {
        const newOurSpeciality = await OurSpeciality.create(req.body);
        res.status(200).json({
            success: true,
            message: "Our speciality created successfully",
            data: newOurSpeciality,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// @desc      GET OUR SPECIALITY
// @route     GET /api/v1/our-speciality/:id
// @access    private
exports.getOurSpeciality = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await OurSpeciality.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific our speciality`,
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
            parseInt(skip) === 0 && OurSpeciality.countDocuments(),
            parseInt(skip) === 0 && OurSpeciality.countDocuments(query),
            OurSpeciality.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all our speciality`,
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

// @desc      UPDATE SPECIFIC OUR SPECIALITY
// @route     PUT /api/v1/our-speciality/:id
// @access    private
exports.updateOurSpeciality = async (req, res) => {
    try {
        const response = await OurSpeciality.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific our speciality",
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

// @desc      DELETE SPECIFIC OUR SPECIALITY
// @route     DELETE /api/v1/our-speciality/:id
// @access    private
exports.deleteOurSpeciality = async (req, res) => {
    try {
        const ourSpeciality = await OurSpeciality.findByIdAndDelete(req.query.id);
        if (!ourSpeciality) {
            return res.status(404).json({
                success: false,
                message: "Our speciality not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Our speciality deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
