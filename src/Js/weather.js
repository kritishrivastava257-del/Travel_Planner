const params = new URLSearchParams(window.location.search);
const city = params.get("city");
const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("error");

let API_KEY = "129f1a10779aab509c330e108de1e6d6";

if (!city) {
  loading.classList.add("hidden");
  errorBox.classList.remove("hidden");
} else {
  cityName.textContent = city;

  async function fetchWeather(cityName) {
    try {
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      console.log(geoRes);
      if (!geoRes.ok) throw new Error("Geo API failed");

      const geoData = await geoRes.json();
      console.log(geoData);

      let { lat, lon } = geoData[0];
      console.log(lat, lon);
    } catch (error) {
      console.log(error, "Error in fetching weather details");
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }
  fetchWeather(city);
}
