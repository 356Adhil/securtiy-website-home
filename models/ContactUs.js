const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        mobile: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        whatsapp: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        youtube: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ContactUs", ContactUsSchema);
