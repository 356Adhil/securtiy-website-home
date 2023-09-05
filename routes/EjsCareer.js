const express = require("express");
const router = express.Router();
const axios = require("axios");
const ContactUs = require("../models/ContactUs");
const OurTeam = require("../models/OurTeam");
const OurService = require("../models/OurService");
const AboutUs = require("../models/AboutUs");
const Enquiry = require("../models/Enquiry");
const Gallery = require("../models/Gallery");
const upload = require('../middleware/ejsUpload')
const Career = require("../models/Career");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const ourTeamPromise = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    // Wait for all API requests to complete
    const [
      galleryResponse,
      aboutUsResponse,
      ourServiceResponse,
      ourTeamResponse,
      contactUsResponse,
    ] = await Promise.all([
      galleryPromise,
      aboutUsPromise,
      ourServicePromise,
      ourTeamPromise,
      contactUsPromise,
    ]);

    // Extract data from the API responses

    const galleryData = galleryResponse;
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
    res.render("Career", {
      title: "Express",
      galleryData,
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

router.post("/submit", upload.single("form_upload"), async (req, res, next) => {
  console.log("hello form submit")
    try {
    const imagePath = req.file ? req.file.path : null;
    console.log(imagePath);
    const {
      form_name,
      form_email,
      form_phone,
      form_gender,
      form_height,
      form_weight,
      form_age,
      form_nationality,
      form_passportNumber,
      form_emiratesId,
      form_siraId,
      form_siraCardType,
    } = req.body;

    console.log("form_message......")

    const requestData = {
      name: form_name,
      email: form_email,
      phnNumber: form_phone,
      gender: form_gender,
      height: form_height,
      weight: form_weight,
      age: form_age,
      nationality: form_nationality,
      passportNumber: form_passportNumber,
      emiratesId: form_emiratesId,
      siraId: form_siraId,
      siraCardType: form_siraCardType,
      files: imagePath,
    };

    const contactUsPostResponse = await Career.create(requestData);

    const contactUsResponse = await Career.find()

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
