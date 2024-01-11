const apiKey = "c8fc628a5963e966c0674716b3250adb";
const lat = "25.260";
const lon = "55.423";
const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
async function getData() {
  const results = await fetch(url);
  const answer = await results.json();
  console.log(answer);
}
getData();
