function removeTrip() {
  const tripDataDiv = document.getElementById("trip-data");
  const cityName = document.getElementById("city");
  const Date = document.getElementById("date");
  tripDataDiv.classList.add("hidden");
  tripDataDiv.innerHTML = ""; // Clear the content
  cityName.value = "";
  Date.value = "";
}

export { removeTrip };
