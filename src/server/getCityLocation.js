// const axios = require("axios");
// const dotenv = require("dotenv");

// dotenv.config();

// async function getCityLocation(city) {
//   try {
//     const response = await axios.get(`https://secure.geonames.org/searchJSON`, {
//       params: {
//         q: city,
//         maxRows: 1,
//         username: "masaabuaisheh",
//       },
//     });
//     const { name, lat, lng } = await response.geonames[0];
//     console.log({ name, lat, lng });
//     console.log(response.data);
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       console.error(
//         "Error: Unauthorized. Please check your GeoNames username and ensure it is correct."
//       );
//     } else {
//       console.error("Error fetching city location:", error.message);
//     }
//   }
// }

// module.exports = { getCityLocation };

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getCityLocation(city) {
  try {
    const response = await axios.get(`https://secure.geonames.org/searchJSON`, {
      params: {
        q: city,
        maxRows: 1,
        username: "masaabuaisheh",
      },
    });

    // Ensure response data structure is as expected
    const geonames = response.data.geonames;
    if (geonames && geonames.length > 0) {
      const { name, lat, lng } = geonames[0]; // Access the first item safely
      //console.log({ name, lat, lng });
      return { name, lat, lng };
    } else {
      console.error("No results found for the specified city.");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error(
        "Error: Unauthorized. Please check your GeoNames username and ensure it is correct."
      );
    } else {
      console.error("Error fetching city location:", error.message);
    }
  }
}

module.exports = { getCityLocation };
