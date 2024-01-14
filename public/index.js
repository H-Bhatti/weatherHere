function doStuff() {
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
        temp: jsonData.temp,
        aqi: jsonData.aqi,
        timestamp: jsonData.timestamp,
      };
      const timestamp = information.timestamp * 1000; // Convert seconds to milliseconds
      const date = new Date(timestamp);
      timeShow.textContent = date;
      latShow.textContent = information.lat;
      lonShow.textContent = information.lon;
      tempShow.textContent = information.temp;
      aqiShow.textContent = information.aqi;
    });
  } else {
    console.error("Geo Location not Available");
  }
}

document.getElementById("checkin").onclick = () => {
  doStuff();
};
