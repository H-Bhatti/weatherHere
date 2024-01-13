const express = require("express");
const fetch = require("node-fetch");
const Datastore = require("nedb");

const app = express();
app.listen(3000, () => console.log("listening"));
app.use(express.static("public"));
// starting express local server

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/getAPIData/:data", async (req, res) => {
  const latLon = req.params.data.split(",");
  const lat = latLon[0];
  const lon = latLon[1];
  const apiKey = "d339a3f471054b41af227bc50c72516a";
  const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  const response = await fetch(apiURL);
  const tempJson = await response.json();
  // console.log(tempJson.data[0].app_temp);

  const aqApiKey = "c8fc628a5963e966c0674716b3250adb";
  const aqApiURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${aqApiKey}`;
  const aqResponse = await fetch(aqApiURL);
  const aqJsonData = await aqResponse.json();

  // console.log(aqJsonData.list[0].main.aqi);

  const sendData = {
    temp: tempJson.data[0].app_temp,
    aqi: aqJsonData.list[0].main.aqi,
    timestamp: aqJsonData.list[0].dt,
  };
  res.json(sendData);

  database.insert(sendData);
});
