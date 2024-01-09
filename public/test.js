const openAQEndpoint = "https://api.openaq.org/v1/latest";
const parameters = {
  coordinates: "25.20,55.29", // Replace with the desired latitude and longitude, e.g., '40.7128,-74.0060'
};
const queryString = new URLSearchParams(parameters).toString();
const url = `${openAQEndpoint}?${queryString}`;

async function getData() {
  const results = await fetch(url);
  const answer = await results.json();
  console.log(answer);
}
getData();
