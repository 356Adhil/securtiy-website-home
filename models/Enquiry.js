const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        services: {
            type: String,
            // enum: ["Event Security", "Security Consultation", "Crowd Management"]
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
