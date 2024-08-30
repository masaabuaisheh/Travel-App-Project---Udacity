import axios from "axios";
import { setRdays } from "./setRdays";

const form = document.querySelector("form");
const dateInp = document.querySelector("#date");
const cityError = document.querySelector("#city-error");
const cityInput = document.querySelector("#city");
const dateError = document.querySelector("#date-error");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateInput()) {
    return;
  }

  try {
    const city = cityInput.value;
    const Location = await getCity(city);

    if (Location.error) {
      cityError.innerHTML = `${Location.message}`;
      cityError.style.display = "block";
      return;
    }

    cityError.style.display = "none";
    const { name, lng, lat } = Location;

    if (dateInp) {
      const date = dateInp.value;
      const Rdays = setRdays(date);
      const Weather = await getWeather(lng, lat, Rdays);
      if (Weather.error) {
        dateError.innerHTML = `${Weather.message}`;
        dateError.style.display = "bock";
        return;
      }
      dateError.style.display = "none";
      console.log("Weather Data:", Weather);

      const picData = await getCityPic(name);
      console.log("Pic Data:", picData);

      updateUI(Rdays, name, picData, Weather);
    } else {
      console.error("Date input is not available");
    }
  } catch (error) {
    console.error("Error in handleSubmit:", error.message);
  }
};

const getCity = async (city) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/getCity",
      { city },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return { message: "Error fetching city data", error: true };
  }
};

const getWeather = async (lng, lat, Rdays) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getWeather", {
      lat,
      lng,
      Rdays,
    });
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
};

const getCityPic = async (name) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getPic", { name });
    console.log("Data from getCityPic:", data);
    return data;
  } catch (error) {
    console.error("Error fetching city picture:", error);
    return {};
  }
};

const updateUI = (Rdays, city, pic, weather) => {
  console.log("Image URL:", pic.image);

  document.querySelector(
    "#Rdays"
  ).innerHTML = `Your trip starts in ${Rdays} days from now`;
  document.querySelector(".cityName").innerHTML = `Location: ${city}`;

  document.querySelector(".weather").innerHTML =
    Rdays > 7
      ? `Weather is: ${weather.description}`
      : `Weather is expected to be: ${weather.description}`;

  document.querySelector(".temp").innerHTML =
    Rdays > 7
      ? `Forecast: ${weather.temp}&degC`
      : `Temperature: ${weather.temp} &deg C`;

  document.querySelector(".max-temp").innerHTML =
    Rdays > 7 ? `Max-Temp: ${weather.app_max_temp}&degC` : "";
  document.querySelector(".min-temp").innerHTML =
    Rdays > 7 ? `Min-Temp: ${weather.app_min_temp}&degC` : "";

  if (pic && pic.image) {
    console.log("Updating image with URL:", pic.image);
    document.querySelector(".cityPic").innerHTML = `
      <img 
      src="${pic.image}" 
      alt="an image that describes the city nature"
      >
    `;
  } else {
    document.querySelector(".cityPic").innerHTML = `No image available.`;
  }

  const flightDataElement = document.querySelector(".flight-data");
  if (flightDataElement) {
    flightDataElement.style.display = "block";
  } else {
    console.error("Flight data element not found.");
  }
};

const validateInput = () => {
  cityError.style.display = "none";
  dateError.style.display = "none";

  if (!cityInput.value) {
    cityError.innerHTML = `You need to enter a name of a city`;
    cityError.style.display = "block";
    return false;
  }
  if (!dateInp.value) {
    dateError.innerHTML = `Please enter a valid date`;
    dateError.style.display = "block";
    return false;
  }
  if (setRdays(dateInp.value) < 0) {
    dateError.innerHTML = `Date cannot be in the past`;
    dateError.style.display = "block";
    return false;
  }
  return true;
};

export { handleSubmit };
