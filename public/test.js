// const openAQEndpoint = "https://api.openaq.org/v1/latest";
// const parameters = {
//   coordinates: "25.20,55.29", // Replace with the desired latitude and longitude, e.g., '40.7128,-74.0060'
// };
// const queryString = new URLSearchParams(parameters).toString();
// const url = `${openAQEndpoint}?${queryString}`;

const apiKey = "c8fc628a5963e966c0674716b3250adb";
const lat = "25.260";
const lon = "55.423";
const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=${apiKey}`;
async function getData() {
  const results = await fetch(url);
  const answer = await results.json();
  console.log(answer);
}
getData();
