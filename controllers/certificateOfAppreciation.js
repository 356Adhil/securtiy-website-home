const { default: mongoose } = require("mongoose");
const CertificateOfAppreciation = require("../models/CertificateOfAppreciation");

// @desc      CREATE NEW CERTIFICATE OF APPRECIATION
// @route     POST /api/v1/certificateof-appreciation
// @access    protect
exports.createCertificateOfAppreciation = async (req, res) => {
    try {
        const newCertificateOfAppreciation = await CertificateOfAppreciation.create(req.body);
        res.status(200).json({
            success: true,
            message: "Certificate of appreciation created successfully",
            data: newCertificateOfAppreciation,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

// @desc      GET ALL CERTIFICATE OF APPRECIATION
// @route     GET /api/v1/certificateof-appreciation
// @access    public
exports.getCertificateOfAppreciation = async (req, res) => {
    try {
        const { id, skip, limit, searchkey } = req.query;
        if (id && mongoose.isValidObjectId(id)) {
            const response = await CertificateOfAppreciation.findById(id);
            return res.status(200).json({
                success: true,
                message: "Retrieved specific certificate of appreciation",
                response,
            });
        }
        const query = searchkey
            ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
            : req.filter;
        const [totalCount, filterCount, data] = await Promise.all([
            parseInt(skip) === 0 && CertificateOfAppreciation.countDocuments(),
            parseInt(skip) === 0 && CertificateOfAppreciation.countDocuments(query),
            CertificateOfAppreciation.find(query)
                .skip(parseInt(skip) || 0)
                .limit(parseInt(limit) || 50)
                .sort({ _id: -1 }),
        ]);
        res.status(200).json({
            success: true,
            message: `Retrieved all certificate of appreciation`,
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

// @desc      UPDATE SPECIFIC CERTIFICATE OF APPRECIATION
// @route     PUT /api/v1/certificateof-appreciation/:id
// @access    protect
exports.updateCertificateOfAppreciation = async (req, res) => {
    try {
        const certificate = await CertificateOfAppreciation.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate of appreciation not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Certificate of appreciation updated successfully",
            data: certificate,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

// @desc      DELETE SPECIFIC CERTIFICATE OF APPRECIATION
// @route     DELETE /api/v1/certificateof-appreciation/:id
// @access    protect
exports.deleteCertificateOfAppreciation = async (req, res) => {
    try {
        const certificate = await CertificateOfAppreciation.findByIdAndDelete(req.query.id);
        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate of appreciation not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Certificate of appreciation deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};
