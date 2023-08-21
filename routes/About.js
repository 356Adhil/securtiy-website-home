const express = require("express");
const router = express.Router();
const axios = require("axios");
const AboutUs = require("../models/AboutUs");
const OurService = require("../models/OurService");
const OurTeam = require("../models/OurTeam");
const ContactUs = require("../models/ContactUs");


/* GET home page. */
router.get("/", async (req, res, next) => {
  try {

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const ourTeamPromise = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

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
    res.render("About", {
      title: "Express",
      aboutUsData,
      ourServiceData,
      ourTeamData,
      contactUsData, // Add contactUsData to the rendering context
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
