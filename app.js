const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.listen(3000, () => console.log("listening"));
app.use(express.static("public"));
// starting express local server

app.get("/getWeathert", async (req, res) => {
  console.log("lat");
  const apiKey = "d339a3f471054b41af227bc50c72516a";
  //   const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  const apiURL =
    "https://api.weatherbit.io/v2.0/current?lat=25.2559544&lon=55.3033014&key=d339a3f471054b41af227bc50c72516a";
  const response = await fetch(apiURL);
  const jsonData = await response.json();
  res.json(jsonData);
});
