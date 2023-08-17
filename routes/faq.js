const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    // Fetch data from the "faq" API
    const faqResponse = await axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/faq"
    );
    const contactUsPromise = axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    );
    const [contactUsResponse] = await Promise.all([contactUsPromise]);
    // Extract data from the API response
    const faqData = faqResponse.data;
    const contactUsData = contactUsResponse.data;

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
