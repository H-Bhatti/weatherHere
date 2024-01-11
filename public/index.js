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
    // gatting the weather api
    const tempAPIURL = `/getWeathert/${lat},${lon}`;
    const response = await fetch(tempAPIURL);
    const jsonData = await response.json();
    console.log(jsonData.data[0]);
    // clling the air quality inde api
    const aqApiUrl = `/getaqi/${lat},${lon}`;
    const aqiResponse = await fetch(aqApiUrl);
    const aqijsonData = await aqiResponse.json();
    console.log(aqijsonData);

    const information = {
      lat: lat,
      lon: lon,
      weatherApi: jsonData,
      aqiApi: aqijsonData,
    };
    populatePage(information);
  });
} else {
  console.error("Geo Location not Available");
}

function populatePage(information) {
  console.log(information);
  const timestamp = information.aqiApi.list[0].dt * 1000; // Convert seconds to milliseconds
  const date = new Date(timestamp);
  latShow.textContent = information.lat.toFixed(2);
  lonShow.textContent = information.lon.toFixed(2);
  tempShow.textContent = information.weatherApi.data[0].app_temp;
  aqiShow.textContent = information.aqiApi.list[0].main.aqi;
  timeShow.textContent = date;

  console.log(date);
}
