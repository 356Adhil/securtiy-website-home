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

/* GET home page with API data. */
router.get("/", async (req, res, next) => {
  try {

    const bannerPromise = await Banner.find()

    const aboutUsPromise = await AboutUs.find()

    const ourServicePromise = await OurService.find()

    const testimonialPromise = await Testimonial.find()

    const newsPromise = await News.find()

    const contactUsPromise = await ContactUs.find()

    const ourSpecialityPromise = await OurSpeciality.find()

    const displayCountPromise = await DisplayCount.find()

    // Fetch data from all APIs
    // const bannerPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/banner"
    // );
    // const aboutUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/about-us"
    // );
    // const ourServicePromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/our-service"
    // );
    // const testimonialPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/testimonial"
    // );
    // const newsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/news"
    // );
    // const contactUsPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    // );
    // const ourSpecialityPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/our-speciality"
    // );
    // const displayCountPromise = axios.get(
    //   "https://securtity-website.azurewebsites.net/api/v1/display-count"
    // );

    // Wait for all API requests to complete
    
    const [
      bannerResponse,
      aboutUsResponse,
      ourServiceResponse,
      testimonialResponse,
      newsResponse,
      contactUsResponse,
      ourSpecialityResponse,
      displayCountResponse,
    ] = await Promise.all([
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
    const bannerData = bannerResponse;
    const aboutUsData = aboutUsResponse;
    const ourServiceData = ourServiceResponse;
    const testimonialData = testimonialResponse;
    const newsData = newsResponse;
    const contactUsData = contactUsResponse;
    const ourSpecialityData = ourSpecialityResponse;
    const displayCountData = displayCountResponse;

    // Console log the fetched data
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
