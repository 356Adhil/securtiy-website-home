const express = require("express");
const router = express.Router();
const axios = require("axios");
const AboutUs = require("../models/AboutUs");
const OurService = require("../models/OurService");
const OurTeam = require("../models/OurTeam");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");


/* GET home page. */
router.get("/", async (req, res, next) => {
  try {

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const ourTeamPromise = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    // Wait for all API requests to complete
    const [
      aboutUsResponse,
      ourServiceResponse,
      ourTeamResponse,
      contactUsResponse,
      galleryResponse,
    ] = await Promise.all([
      aboutUsPromise,
      ourServicePromise,
      ourTeamPromise,
      contactUsPromise,
      galleryPromise,
    ]);

    // Extract data from the API responses
    const aboutUsData = aboutUsResponse;
    const ourServiceData = ourServiceResponse;
    const ourTeamData = ourTeamResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

    // Console log the fetched data
    console.log("About Us Data:", aboutUsData);
    console.log("Our Service Data:", ourServiceData);
    console.log("Our Team Data:", ourTeamData);
    console.log("Contact Us Data:", contactUsData);

    // Render the EJS template with the fetched data
    res.render("About", {
      title: "Express",
      galleryData,
      aboutUsData,
      ourServiceData,
      ourTeamData,
      contactUsData, // Add contactUsData to the rendering context
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
