const latShow = document.getElementById("lat");
const lonShow = document.getElementById("lon");
const tempShow = document.getElementById("temp");
const aqiShow = document.getElementById("aqi");
const timeShow = document.getElementById("time");

if ("geolocation" in navigator) {
  console.log("GeoLocation Available");
  // getting geo loation cocordinates
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    // gatting the weather api and AQI API
    const APIURL = `/getAPIData/${lat},${lon}`;
    const response = await fetch(APIURL);
    const jsonData = await response.json();
    const information = {
      lat: lat,
      lon: lon,
      data: jsonData,
    };
    populatePage(information);
  });
} else {
  console.error("Geo Location not Available");
}

function populatePage(information) {
  console.log(information);

  const timestamp = information.data.timestamp * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  timeShow.textContent = date;
  latShow.textContent = information.lat;
  lonShow.textContent = information.lon;
  tempShow.textContent = information.data.temp;
  aqiShow.textContent = information.data.aqi;
}
