const loading = document.getElementById("Loading");
//Weather data UI
const locationTxt = document.getElementById("Location");
const dateTxt = document.getElementById("Date");
const iconImg = document.getElementById("StatusIcon");
const weatherTxt = document.getElementById("Weather");
const avghumidityTxt = document.getElementById("Avghumidity");
const sunriseTxt = document.getElementById("Sunrise");
const sunsetTxt = document.getElementById("Sunset");
const dWitRTxt = document.getElementById("DWitR");
const dWitSTxt = document.getElementById("DWitS");
const totalSnowcmTxt = document.getElementById("TotalSnowcm");
const moonPhaseTxt = document.getElementById("MoonPhase");
const avgtempCTxt = document.getElementById("AvgtempC");
const mintempCTxt = document.getElementById("MintempC");
const avgtempFTxt = document.getElementById("AvgtempF");
const mintempFTxt = document.getElementById("MintempF");
const maxwindKphTxt = document.getElementById("MaxwindKph");
const maxwindMphTxt = document.getElementById("MaxwindMph");
const errorTxt = document.getElementById("Error");
const weatherBtn = document.getElementById("weatherBtn");

async function GetApi() {
  // Storing response
  const city = document.getElementById("City").value;
  const when = parseInt(document.getElementById("When").value, 10);
  const apiUrl = "/api/data";

  try {
    const response = await fetch(apiUrl, {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Indicate that the request body is JSON
      },
      body: JSON.stringify({ city, when }), // Convert data to JSON
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    DisplayWeatherData(data, when); // Call function to display response data
  } catch (error) {
    console.error("Error sending data:", error);
    errorTxt.style.display = "block";
    setInterval(() => {
      RemoveLoading();
    }, 3000);
  }
}

function DisplayWeatherData(data, w) {
  _forcastArr = data.forecast.forecastday[w - 1];

  const _dateFormat = new Date(_forcastArr.date);
  const _day = _dateFormat.getDate();
  const _month = _dateFormat.getMonth() + 1;
  const _year = _dateFormat.getFullYear();

  iconImg.src = _forcastArr.day.condition["icon"];
  locationTxt.innerHTML =
    data.location["name"] + ", " + data.location["country"];
  dateTxt.innerHTML = _month + "/" + _day + "/" + _year;
  weatherTxt.innerHTML = _forcastArr.day.condition["text"];
  avghumidityTxt.innerHTML = _forcastArr.day["avghumidity"];
  sunriseTxt.innerHTML = _forcastArr.astro["sunrise"];
  sunsetTxt.innerHTML = _forcastArr.astro["sunset"];
  dWitRTxt.innerHTML = _forcastArr.day["daily_chance_of_rain"];
  dWitSTxt.innerHTML = _forcastArr.day["daily_chance_of_snow"];
  totalSnowcmTxt.innerHTML = _forcastArr.day["totalsnow_cm"];
  moonPhaseTxt.innerHTML = _forcastArr.astro["moon_phase"];
  avgtempCTxt.innerHTML = _forcastArr.day["avgtemp_c"];
  mintempCTxt.innerHTML = _forcastArr.day["mintemp_c"];
  avgtempFTxt.innerHTML = _forcastArr.day["avgtemp_f"];
  mintempFTxt.innerHTML = _forcastArr.day["mintemp_f"];
  maxwindKphTxt.innerHTML = _forcastArr.day["maxwind_kph"];
  maxwindMphTxt.innerHTML = _forcastArr.day["maxwind_mph"];
  RemoveLoading();
}

function CitySelected() {
  document.getElementById("Error").style.display = "none";
  loading.style.display = "block";

  GetApi();
}

async function FailedToCollectData() {
  errorTxt.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  errorTxt.style.display = "none";
  loading.style.display = "none";
}

weatherBtn.addEventListener("click", () => {
  CitySelected();
});

function RemoveLoading() {
  errorTxt.style.display = "none";
  loading.style.display = "none";
}
