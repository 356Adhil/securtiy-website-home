const mongoose = require("mongoose");

const DisplayCountSchema = new mongoose.Schema(
    {
        yearsInBusiness: {
            type: String,
        },
        totalGuards: {
            type: String,
        },
        happyClients: {
            type: String,
        },
        awards: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("DisplayCount", DisplayCountSchema);
