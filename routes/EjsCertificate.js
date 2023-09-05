const express = require("express");
const router = express.Router();
const axios = require("axios");
const OurTeam = require("../models/OurTeam");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");
const Certificate = require('../models/CertificateOfAppreciation')

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    // Fetch data from the "about-us," "our-service," and "our-team" APIs

    const ourTeamPromise = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    const certificatePromise = await Certificate.find()

    // Wait for all API requests to complete
    const [ourTeamResponse, contactUsResponse, galleryResponse, certificateResponse] = await Promise.all([
      ourTeamPromise,
      contactUsPromise,
      galleryPromise,
      certificatePromise,
    ]);

    // Extract data from the API responses

    const ourTeamData = ourTeamResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;
    const certificateData = certificateResponse;
    // Console log the fetched data

    console.log("Our Team Data:", ourTeamData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("Certificate", {
      title: "Express",
      ourTeamData,
      contactUsData,
      galleryData,
      certificateData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
