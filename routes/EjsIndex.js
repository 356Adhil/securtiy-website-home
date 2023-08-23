const express = require("express");
const router = express.Router();
const axios = require("axios");
const Banner = require("../models/Banner");
const AboutUs = require("../models/AboutUs");
const OurService = require("../models/OurService");
const Testimonial = require("../models/Testimonial");
const News = require("../models/News");
const ContactUs = require("../models/ContactUs");
const OurSpeciality = require("../models/OurSpeciality");
const DisplayCount = require("../models/DisplayCount");
const Gallery = require("../models/Gallery");

/* GET home page with API data. */
router.get("/", async (req, res, next) => {
  try {

    const galleryPromise = await Gallery.find()

    const bannerPromise = await Banner.find()

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const testimonialPromise = await Testimonial.find()

    const newsPromise = await News.find()

    const contactUsPromise = await ContactUs.find()

    const ourSpecialityPromise = await OurSpeciality.find()

    const displayCountPromise = await DisplayCount.find()

    console.log(galleryPromise)

    // Wait for all API requests to complete
    
    const [
      galleryResponse,
      bannerResponse,
      aboutUsResponse,
      ourServiceResponse,
      testimonialResponse,
      newsResponse,
      contactUsResponse,
      ourSpecialityResponse,
      displayCountResponse,
    ] = await Promise.all([
      galleryPromise,
      bannerPromise,
      aboutUsPromise,
      ourServicePromise,
      testimonialPromise,
      newsPromise,
      contactUsPromise,
      ourSpecialityPromise,
      displayCountPromise,
    ]);

    // Extract data from the API responses
    const galleryData = galleryResponse;
    const bannerData = bannerResponse;
    const aboutUsData = aboutUsResponse;
    const ourServiceData = ourServiceResponse;
    const testimonialData = testimonialResponse;
    const newsData = newsResponse;
    const contactUsData = contactUsResponse;
    const ourSpecialityData = ourSpecialityResponse;
    const displayCountData = displayCountResponse;

    // Console log the fetched data
    console.log("Gallery Data:", galleryData);
    console.log("Banner Data:", bannerData);
    console.log("About Us Data:", aboutUsData);
    console.log("Our Service Data:", ourServiceData);
    console.log("Testimonial Data:", testimonialData);
    console.log("News Data:", newsData);
    console.log("Contact Us Data:", contactUsData);
    console.log("Our Speciality Data:", ourSpecialityData);
    console.log("Display Count Data:", displayCountData);

    // Render the EJS template with the fetched data
    res.render("index", {
      title: "API Data in EJS",
      galleryData,
      bannerData,
      aboutUsData,
      ourServiceData,
      testimonialData,
      newsData,
      contactUsData,
      ourSpecialityData,
      displayCountData, // Pass the new data to the template
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
