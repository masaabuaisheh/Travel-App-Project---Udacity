const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { getCityLocation } = require("./getCityLocation");
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(cors());

const port = 8000;

// Define routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  const Location = await getCityLocation(city);
  res.send(Location);
  //console.log(Location);
});

app.post("/getWeather", async (req, res) => { 
  const { lat, lng, Rdays } = req.body;
  const Weather = await getWeather(lat, lng, Rdays, key);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
