const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    ourService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OurService",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("faq", FaqSchema);
