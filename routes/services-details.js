const express = require("express");
const router = express.Router();
const axios = require("axios");
const OurService = require("../models/OurService");
const faq = require("../models/faq");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");

router.get("/:id", async (req, res, next) => {
  try {
    const serviceId = req.params.id;

    const serviceResponse = await OurService.find()

    const contactUsPromise = await ContactUs.find()
    
    const faqResponse = await faq.find()

    const galleryPromise = await Gallery.find()
    
    const selectedService = await OurService.findOne({ _id: serviceId });
    
    // Wait for all API requests to complete
    const [contactUsResponse, galleryResponse] = await Promise.all([contactUsPromise, galleryPromise]);

    // Extract data from the API responses
    const serviceData = serviceResponse;
    const faqData = faqResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

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
      galleryData,
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
