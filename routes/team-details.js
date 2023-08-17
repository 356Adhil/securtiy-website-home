const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", async (req, res, next) => {
  console.log('sdjbfjsdbkjbskjdksbvkdsvslskndknv.....................sdfsdfbsjhdbfkjsfd........')
  try {
    const teamId = req.params.id;
    // Fetch data from the "our-team" API
    const ourTeamResponse = await axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/our-team"
    );
    const contactUsPromise = axios.get(
      "https://securtity-website.azurewebsites.net/api/v1/contact-us"
    );
    // Wait for all API requests to complete
    const [contactUsResponse] = await Promise.all([contactUsPromise]);
    // Extract data from the API response
    const ourTeamData = ourTeamResponse.data;
    const contactUsData = contactUsResponse.data;

        // Find the selected team by _id
        const selectedTeam = ourTeamData.response.find(team => team._id === teamId);

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
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Render an error page or handle the error gracefully
    res.render("error", { title: "Error" });
  }
});

module.exports = router;
