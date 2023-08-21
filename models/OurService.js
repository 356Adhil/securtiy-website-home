const mongoose = require("mongoose");

const OurServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        features: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OurService", OurServiceSchema);
