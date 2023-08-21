const express = require("express");
const router = express.Router();
const axios = require("axios");
const News = require("../models/News");
const ContactUs = require("../models/ContactUs");
const AboutUs = require("../models/AboutUs");

router.get("/", async (req, res, next) => {
  try {

    const newsPromise = await News.find()

    const contactUsPromise = await ContactUs.find()

    const aboutUsPromise = await AboutUs.find()

    // Fetch data from the "about-us," "news," and "contact-us" APIs
    // const aboutUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/about-us"
    // );
    // const newsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/news"
    // );
    // const contactUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    // );

    // Wait for all API requests to complete
    const [aboutUsResponse, newsResponse, contactUsResponse] =
      await Promise.all([aboutUsPromise, newsPromise, contactUsPromise]);

    // Extract data from the API responses
    const aboutUsData = aboutUsResponse;
    const newsData = newsResponse;
    const contactUsData = contactUsResponse;

    // Log the fetched data
    console.log("About Us Data:", aboutUsData);
    console.log("News Data:", newsData);
    console.log("Contact Us Data:", contactUsData);

    // Render the EJS template with the fetched data
    res.render("NewsDetails", {
      title: "Express",
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
