const express = require("express");
const router = express.Router();
const axios = require("axios");
const ContactUs = require("../models/ContactUs");
const OurTeam = require("../models/OurTeam");
const OurService = require("../models/OurService");
const AboutUs = require("../models/AboutUs");
const Enquiry = require("../models/Enquiry");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    // Fetch data from the "about-us," "our-service," "our-team," and "contact-us" APIs
    // const aboutUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/about-us"
    // );
    // const ourServicePromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/our-service"
    // );
    // const ourTeamPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/our-team"
    // );
    // const contactUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    // );

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const ourTeamPromise = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

    // Wait for all API requests to complete
    const [
      aboutUsResponse,
      ourServiceResponse,
      ourTeamResponse,
      contactUsResponse,
    ] = await Promise.all([
      aboutUsPromise,
      ourServicePromise,
      ourTeamPromise,
      contactUsPromise,
    ]);

    // Extract data from the API responses
    const aboutUsData = aboutUsResponse;
    const ourServiceData = ourServiceResponse;
    const ourTeamData = ourTeamResponse;
    const contactUsData = contactUsResponse;

    // Console log the fetched data
    console.log("About Us Data:", aboutUsData);
    console.log("Our Service Data:", ourServiceData);
    console.log("Our Team Data:", ourTeamData);
    console.log("Contact Us Data:", contactUsData);

    // Render the EJS template with the fetched data
    res.render("Contact", {
      title: "Express",
      aboutUsData,
      ourServiceData,
      ourTeamData,
      contactUsData, // Include the new data in the rendered template
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

router.post("/submit", async (req, res, next) => {
  try {
    const {
      form_name,
      form_email,
      form_subject,
      form_phone,
      form_message,
    } = req.body;

    console.log("form_message......")

    const requestData = {
      name: form_name,
      email: form_email,
      phone: form_phone,
      message: form_message,
      services: form_subject,
    };

    const contactUsPostResponse = await Enquiry.create(requestData);

    const contactUsResponse = await Enquiry.find()

    // Post the form data to the external API
    // const contactUsPostResponse = await axios.post(
    //   "https://securtity-website.azurewebsites.net/api/v1/enquiry",
    //   requestData
    // );

    // Fetch data from the external API
    // const contactUsResponse = await axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/enquiry"
    // );

    // Extract data from API responses
    const contactUsPostData = contactUsPostResponse;
    const contactUsData = contactUsResponse;

    console.log("Contact Us Post Data:", contactUsPostData);
    console.log("Contact Us Data:", contactUsData);

    res.status(200).json({ message: "Form data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "An error occurred while submitting the form." });
  }
});

module.exports = router;
