const { setRdays } = require("./setRdays");

const validateInput = () => {
  const cityInput = document.getElementById("city");
  const dateInp = document.getElementById("date");
  const cityError = document.getElementById("city-error");
  const dateError = document.getElementById("date-error");

  if (!cityError || !dateError) {
    console.error("Error elements are not found in the DOM");
    return false;
  }

  cityError.style.display = "none";
  dateError.style.display = "none";

  if (!cityInput.value) {
    cityError.innerHTML = "You need to enter a name of a city";
    cityError.style.display = "block";
    return false;
  }
  if (!dateInp.value) {
    dateError.innerHTML = "Please enter a valid date";
    dateError.style.display = "block";
    return false;
  }
  if (setRdays(dateInp.value) < 0) {
    dateError.innerHTML = "Date cannot be in the past";
    dateError.style.display = "block";
    return false;
  }
  return true;
};

export { validateInput };
