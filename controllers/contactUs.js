const { default: mongoose } = require("mongoose");
const ContactUs = require("../models/ContactUs");

// @desc      CREATE CONTACT US
// @route     POST /api/v1/contact-us
// @access    private
exports.createContactUs = async (req, res) => {
    try {
        const response = await ContactUs.create(req.body);
        res.status(200).json({
            success: true,
            message: "Successfully added contact us",
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

// @desc      GET CONTACT US
// @route     GET /api/v1/contact-us
// @access    private
exports.getContactUs = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await ContactUs.findById(id);
            return res.status(200).json({
                success: true,
                message: `Retrieved specific contact us`,
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
            parseInt(skip) === 0 && ContactUs.countDocuments(),
            parseInt(skip) === 0 && ContactUs.countDocuments(query),
            ContactUs.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all contact us`,
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

// @desc      UPDATE CONTACT US
// @route     PUT /api/v1/contact-us
// @access    private
exports.updateContactUs = async (req, res) => {
    try {
        const response = await ContactUs.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated specific contact us",
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

// @desc      DELETE CONTACT US
// @route     DELETE /api/v1/contact-us
// @access    private
exports.deleteContactUs = async (req, res) => {
    try {
        const contactUs = await ContactUs.findByIdAndDelete(req.query.id);
        if (!contactUs) {
            return res.status(404).json({
                success: false,
                message: "Contact us not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Contact us deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
