const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    // Fetch data from the "our-service" API
    const serviceResponse = await axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/our-service"
    );
    const contactUsPromise = axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    );
    // Wait for all API requests to complete
    const [contactUsResponse] = await Promise.all([contactUsPromise]);

    // Extract data from the API response
    const serviceData = serviceResponse.data;
    const contactUsData = contactUsResponse.data;
    // Log the fetched data
    console.log("Fetched Service Data:", serviceData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("services", {
      title: "Our Services",
      serviceData,
      contactUsData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
