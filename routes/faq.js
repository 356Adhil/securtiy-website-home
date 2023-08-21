const express = require("express");
const router = express.Router();
const axios = require("axios");
const faq = require("../models/faq");
const ContactUs = require("../models/ContactUs");

router.get("/", async (req, res, next) => {
  try {

    const faqResponse = await faq.find()

    const contactUsPromise = await ContactUs.find()

    // Fetch data from the "faq" API
    // const faqResponse = await axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/faq"
    // );
    // const contactUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    // );
    const [contactUsResponse] = await Promise.all([contactUsPromise]);
    // Extract data from the API response
    const faqData = faqResponse;
    const contactUsData = contactUsResponse;

    // Log the fetched data
    console.log("Fetched FAQ Data:", faqData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("faq", {
      title: "Frequently Asked Questions",
      faqData,
      contactUsData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
