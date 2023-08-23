const express = require("express");
const router = express.Router();
const axios = require("axios");
const News = require("../models/News");
const Testimonial = require("../models/Testimonial");
const ContactUs = require("../models/ContactUs");
const AboutUs = require("../models/AboutUs");
const Gallery = require("../models/Gallery");

router.get("/", async (req, res, next) => {
  try {

    const aboutUsPromise = await AboutUs.find()

    const newsPromise = await News.find()

    const testimonialPromise = await Testimonial.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    // Wait for all API requests to complete
    const [
      aboutUsResponse,
      newsResponse,
      testimonialResponse,
      contactUsResponse,
      galleryResponse,
    ] = await Promise.all([
      aboutUsPromise,
      newsPromise,
      testimonialPromise,
      contactUsPromise,
      galleryPromise,
    ]);

    // Extract data from the API responses
    const aboutUsData = aboutUsResponse;
    const newsData = newsResponse;
    const testimonialData = testimonialResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

    // Log the fetched data
    console.log("About Us Data:", aboutUsData);
    console.log("News Data:", newsData);
    console.log("Testimonial Data:", testimonialData);
    console.log("Contact Us Data:", contactUsData);

    // Render the EJS template with the fetched data
    res.render("testimonial", {
      title: "Express",
      galleryData,
      aboutUsData,
      newsData,
      testimonialData,
      contactUsData, // Pass the contact data to the template
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
