const axios = require("axios");

const getWeather = async (lat, lng, Rdays, key) => {
  if (!Rdays) {
    const errMsg = {
      message: "Please Enter a valid date",
      error: true,
    };
    return errMsg;
  }
  if (Rdays < 0) {
    const errMsg = {
      message: "Date cannot be in the past",
      error: true,
    };
    return errMsg;
  }
  if (Rdays > 0 && Rdays <= 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${key}`
    );
    const { weather, temp } = data.data[0];
    const { description } = weather;
    const weather_data = { description, temp };
    return weather_data;
  } else if (Rdays > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${Rdays}&key=${key}`
    );
    const { weather, temp, app_max_temp, app_min_temp } =
      data.data[data.data.length - 1];
    const { description } = weather;
    weather_data = { description, temp, app_max_temp, app_min_temp };
    return weather_data;
  }
};

module.exports = {
  getWeather,
};
