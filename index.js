const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("src"));
app.use(cors());

app.post("/api/data", async (req, res) => {
  const { city, when } = req.body;
  const apiKey = process.env.API_KEY;
  const apiUrl =
    "https://api.weatherapi.com/v1/forecast.json?" +
    "key=" +
    apiKey +
    "&q=" +
    city +
    "&days=" +
    when +
    "&aqi=no&alerts=no";

  try {
    const response = await fetch(apiUrl);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

app.listen(port, () => {
  console.log(`Port: ${[port]}`);
});
