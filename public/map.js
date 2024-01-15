async function getData() {
  // adding map
  var map = L.map("mapID").setView([0, 0], 1);

  // Gwtting layers of tiles
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright"></a>',
  }).addTo(map);

  //   getting data from server
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);
  data.forEach((element) => {
    const marker = L.marker(element).addTo(map);

    // text to popup on markers
    const text = `<p>TimeStamp: ${new Date(element.timestamp * 1000)}</span></p>
    <span>Latitude: ${element.lat}</span>° </span>
    <span> | Longitude: ${element.lon}</span>°</span>
    <p>The temperature is: ${element.temp}</span>°C</p>
    <p>The AQI is: ${element.aqi}</span></p>`;

    marker.bindPopup(text);

    // plotting data on map
  });
}

getData();
