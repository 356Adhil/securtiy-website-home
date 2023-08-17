const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    // Fetch data from the "about-us," "our-service," and "our-team" APIs

    const ourTeamPromise = axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/our-team"
    );
    const contactUsPromise = axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    );
    // Wait for all API requests to complete
    const [ourTeamResponse, contactUsResponse] = await Promise.all([
      ourTeamPromise,
      contactUsPromise,
    ]);

    // Extract data from the API responses

    const ourTeamData = ourTeamResponse.data;
    const contactUsData = contactUsResponse.data;
    // Console log the fetched data

    console.log("Our Team Data:", ourTeamData);
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("team", {
      title: "Express",
      ourTeamData,
      contactUsData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
