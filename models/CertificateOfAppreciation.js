const mongoose = require("mongoose");

const CertificateOfAppreciationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CertificateOfAppreciation", CertificateOfAppreciationSchema);
