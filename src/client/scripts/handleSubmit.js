import axios from "axios";

const form = document.querySelector("form");
const cityInp = document.querySelector("#city");
const dateInp = document.querySelector("#date");

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Iam working fine");

  const Location = await getCity();
  const { name, lng, lat } = Location;

  if (dateInp) {
    const date = dateInp.value;
    const Rdays = setRdays(date);
    //console.log(Rdays);
    const Weather = getWeather(lng, lat, Rdays);
  } else {
    console.error("Date input is not available");
  }
};

const getCity = async () => {
  const { data } = await axios.post("http://localhost:8000/getCity", form, {
    headers: {
      "content-type": "application/json",
    },
  });
  console.log(data);
  return data;
};

const setRdays = (date) => {
  const now = new Date();
  const travleDate = new Date(date);
  const timeDifference = travleDate.getTime() - now.getTime();
  const Rdays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return Rdays;
};

const getWeather = async (lng, lat, Rdays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lat,
    lng,
    Rdays
  });
};
export { handleSubmit };
