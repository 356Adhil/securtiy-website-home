const express = require("express");
const router = express.Router();
const axios = require("axios");
const faq = require("../models/faq");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");

router.get("/", async (req, res, next) => {
  try {

    const faqResponse = await faq.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()
    
    const [contactUsResponse, galleryResponse] = await Promise.all([contactUsPromise, galleryPromise]);
    // Extract data from the API response
    const faqData = faqResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

    // Log the fetched data
    console.log("gallery Data:", galleryData);
    console.log("Fetched FAQ Data:", faqData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("faq", {
      title: "Frequently Asked Questions",
      faqData,
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
