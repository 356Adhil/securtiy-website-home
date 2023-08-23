const express = require("express");
const router = express.Router();
const axios = require("axios");
const News = require("../models/News");
const ContactUs = require("../models/ContactUs");
const AboutUs = require("../models/AboutUs");
const Gallery = require("../models/Gallery");

router.get("/:id", async (req, res, next) => {
  try {

    const newsId = req.params.id;

    const newsPromise = await News.find()

    const contactUsPromise = await ContactUs.find()

    const aboutUsPromise = await AboutUs.find()

    const galleryPromise = await Gallery.find()

    const selectedNews = await News.findOne({ _id: newsId });



    // Wait for all API requests to complete
    const [aboutUsResponse, newsResponse, contactUsResponse, galleryResponse] =
      await Promise.all([aboutUsPromise, newsPromise, contactUsPromise, galleryPromise]);

    // Extract data from the API responses
    const aboutUsData = aboutUsResponse;
    const newsData = newsResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

    // Log the fetched data
    console.log("About Us Data:", aboutUsData);
    console.log("News Data:", newsData);
    console.log("Contact Us Data:", contactUsData);

    // Render the EJS template with the fetched data
    res.render("NewsDetails", {
      title: "Express",
      galleryData,
      selectedNews,
      aboutUsData,
      newsData,
      contactUsData, // Pass the contact data to the template
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
