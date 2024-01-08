if ("geolocation" in navigator) {
  console.log("GeoLocation Available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
    // const apiKey = "d339a3f471054b41af227bc50c72516a";
    // const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const apiURL = `/getWeathert`;

    const response = await fetch(apiURL);
    const jsonData = await response.json();
    console.log(jsonData);
  });
} else {
  console.error("Geo Location not Available");
}
