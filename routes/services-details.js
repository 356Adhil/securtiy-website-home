const express = require("express");
const router = express.Router();
const axios = require("axios");
const OurService = require("../models/OurService");
const faq = require("../models/faq");
const ContactUs = require("../models/ContactUs");

router.get("/:id", async (req, res, next) => {
  try {
    const serviceId = req.params.id;

    const serviceResponse = await OurService.find()

    const contactUsPromise = await ContactUs.find()
    
    const faqResponse = await faq.find()
    
    const selectedService = await OurService.findOne({ _id: serviceId });

    // Fetch data from the "our-service" API
    // const serviceResponse = await axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/our-service"
    // );

    // Fetch data from the "faq" API
    // const faqResponse = await axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/faq"
    // );

    // const contactUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    // );

    // Wait for all API requests to complete
    const [contactUsResponse] = await Promise.all([contactUsPromise]);

    // Extract data from the API responses
    const serviceData = serviceResponse;
    const faqData = faqResponse;
    const contactUsData = contactUsResponse;

    // Find the selected service by _id

    console.log(selectedService)

    // Log the fetched data
    console.log("Fetched Service Data:", serviceData);
    console.log("Fetched FAQ Data:", faqData);
    console.log("Contact Us Data:", contactUsData);
    console.log("Selected Service:", selectedService);

    // Render the EJS template with the fetched data and selected service
    res.render("services-details", {
      title: "Service Details",
      serviceData,
      faqData,
      contactUsData,
      selectedService, // Pass the selected service to the template
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
