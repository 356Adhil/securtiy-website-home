const express = require("express");
const router = express.Router();
const axios = require("axios");
const OurService = require("../models/OurService");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");

router.get("/", async (req, res, next) => {
  try {

    const serviceResponse = await OurService.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    // Wait for all API requests to complete
    const [contactUsResponse, galleryResponse] = await Promise.all([contactUsPromise, galleryPromise]);

    // Extract data from the API response
    const serviceData = serviceResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;
    // Log the fetched data
    console.log("Fetched Service Data:", serviceData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("services", {
      title: "Our Services",
      serviceData,
      contactUsData,
      galleryData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
