const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getCityLocation(city) {
  try {
    const response = await axios.get(`https://secure.geonames.org/searchJSON`, {
      params: {
        q: city,
        maxRows: 1,
        username: process.env.MY_APP_USERNAME, // Use environment variable
      },
    });

    const geonames = response.data.geonames;

    if (!geonames || geonames.length === 0) {
      return {
        message: "No city with that name. Please make sure of your spelling",
        error: true,
      };
    }

    const { name, lat, lng } = geonames[0]; // Access the first item safely
    return { name, lat, lng };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error(
        "Error: Unauthorized. Please check your GeoNames username and ensure it is correct."
      );
    } else {
      console.error("Error fetching city location:", error.message);
    }
    return {
      message: "An error occurred while fetching city location.",
      error: true,
    };
  }
}

module.exports = { getCityLocation };
