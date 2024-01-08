if ("geolocation" in navigator) {
  console.log("GeoLocation Available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
  });
}
