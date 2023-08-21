const mongoose = require("mongoose");

const OurTeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        designation: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        active: {
            type: Boolean,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OurTeam", OurTeamSchema);
