const { default: mongoose } = require("mongoose");
const Faq = require("../models/faq");

// @desc      CREATE FAQ
// @route     POST /api/v1/faq
// @access    private
exports.createFaq = async (req, res, next) => {
  try {
    const response = await Faq.create(req.body);
    res.status(200).json({
      success: true,
      message: "Successfully added faq",
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

// @desc      GET FAQ
// @route     GET /api/v1/faq
// @access    private
exports.getFaq = async (req, res) => {
  try {
    const { id, skip, limit, searchkey } = req.query;
    if (id && mongoose.isValidObjectId(id)) {
      const response = await Faq.findById(id).populate("ourService");
      return res.status(200).json({
        success: true,
        message: `Retrieved faq`,
        response,
      });
    }
    const query = searchkey
      ? { ...req.filter, title: { $regex: searchkey, $options: "i" } }
      : req.filter;
    const [totalCount, filterCount, data] = await Promise.all([
      parseInt(skip) === 0 && Faq.countDocuments(),
      parseInt(skip) === 0 && Faq.countDocuments(query),
      Faq.find(query)
        .populate("ourService")
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 50),
    ]);
    res.status(200).json({
      success: true,
      message: `Retrieved all faq`,
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

// @desc      UPDATE FAQ
// @route     PUT /api/v1/faq
// @access    private
exports.updateFaq = async (req, res) => {
  try {
    const response = await Faq.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Updated specific faq",
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

// @desc      DELETE FAQ
// @route     DELETE /api/v1/faq
// @access    private
exports.deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.query.id);
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "Faq not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
