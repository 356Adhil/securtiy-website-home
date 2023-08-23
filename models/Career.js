const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phnNumber: {
            type: String,
        },
        gender: {
            type: String,
            // enum: ["Male", "Female"]
        },
        height: {
            type: String,
        },
        weight: {
            type: String,
        },
        age: {
            type: String,
        },
        nationality: {
            type: String,
        },
        passportNumber: {
            type: String,
        },
        emiratesId: {
            type: String,
        },
        siraId: {
            type: String,
        },
        siraCardType: {
            type: String,
            // enum: ["Event Security", "Security Guard", "Security Supervisor", "Security Manager"]
        },
        files: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Career", CareerSchema);
