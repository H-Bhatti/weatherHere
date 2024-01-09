const latShow = document.getElementById("lat");
const lonShow = document.getElementById("lon");
const tempShow = document.getElementById("temp");

if ("geolocation" in navigator) {
  console.log("GeoLocation Available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    const apiURL = `/getWeathert/${lat},${lon}`;
    const response = await fetch(apiURL);
    const jsonData = await response.json();
    console.log(jsonData.data[0]);
    latShow.textContent = lat.toFixed(2);
    lonShow.textContent = lon.toFixed(2);
    tempShow.textContent = jsonData.data[0].app_temp;
  });
} else {
  console.error("Geo Location not Available");
}
