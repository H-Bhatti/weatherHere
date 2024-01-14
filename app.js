const express = require("express");
const fetch = require("node-fetch");
const Datastore = require("nedb");
require("dotenv").config();

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
  const apiKey = process.env.WEATHER_API_KEY;
  const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  const response = await fetch(apiURL);
  const tempJson = await response.json();
  // console.log(tempJson.data[0].app_temp);

  const aqApiKey = process.env.AQI_API_KEY;
  const aqApiURL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${aqApiKey}`;
  const aqResponse = await fetch(aqApiURL);
  const aqJsonData = await aqResponse.json();

  // console.log(aqJsonData.list[0].main.aqi);

  const sendData = {
    lat,
    lon,
    temp: tempJson.data[0].app_temp,
    aqi: aqJsonData.list[0].main.aqi,
    timestamp: aqJsonData.list[0].dt,
  };
  res.json(sendData);

  database.insert(sendData);
});

app.get("/api", async (req, res) => {
  database.find({}, function (err, docs) {
    res.json(docs);
  });
});
