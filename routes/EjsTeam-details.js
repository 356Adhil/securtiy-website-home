const express = require("express");
const router = express.Router();
const axios = require("axios");
const OurTeam = require("../models/OurTeam");
const ContactUs = require("../models/ContactUs");
const Gallery = require("../models/Gallery");

router.get("/:id", async (req, res, next) => {
  try {
    const teamId = req.params.id;

    const ourTeamResponse = await OurTeam.find()

    const contactUsPromise = await ContactUs.find()

    const galleryPromise = await Gallery.find()

    // Wait for all API requests to complete
    const [contactUsResponse, galleryResponse] = await Promise.all([contactUsPromise, galleryPromise]);
    // Extract data from the API response
    const ourTeamData = ourTeamResponse;
    const contactUsData = contactUsResponse;
    const galleryData = galleryResponse;

        // Find the selected team by _id
        const selectedTeam = await OurTeam.findOne({ _id: teamId });

    // Log the fetched data
    console.log("Fetched Our Team Data:", ourTeamData);
    console.log("Selected Team Data:", selectedTeam);    
    console.log("Contact Us Data:", contactUsData);
    // Render the EJS template with the fetched data
    res.render("team-details", {
      title: "Team Details",
      ourTeamData,
      contactUsData,
      selectedTeam,
      galleryData,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
