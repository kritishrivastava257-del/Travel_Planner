const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const placesBox = document.querySelector("#placesBox");
const errors = document.querySelector("#error");

let WeatherAPI_KEY = "129f1a10779aab509c330e108de1e6d6";
let UnsplashAPI_KEY = "TJnyqjO62gMWScQFii89PPSMigwtNqNrxEMaKIzPNZE";
let GeoapifyAPI_KEY = "93f6a31c36294d2fa8041407fcc02f6a";

if (!city) {

  loading.classList.add("hidden");

  errors.textContent = "City Not Provided";

  errors.classList.remove("hidden");

} else {

  cityName.textContent = `Best places in ${city}`;

  async function fetchPlaces(cityName) {

    try {

      // Get Latitude & Longitude
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WeatherAPI_KEY}`
      );

      if (!geoRes.ok) {
        throw new Error("Location API Failed");
      }

      const geoData = await geoRes.json();

      if (!geoData.length) {
        throw new Error("City Not Found");
      }

      const { lat, lon } = geoData[0];

      // Fetch Tourist Places
      const placesRes = await fetch(
        `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},12000&limit=12&apiKey=${GeoapifyAPI_KEY}`
      );

      if (!placesRes.ok) {
        throw new Error("Places API Failed");
      }

      const data = await placesRes.json();

      loading.classList.add("hidden");

      if (!data.features || data.features.length === 0) {
        throw new Error("No Places Found");
      }

      // SHOW GRID PROPERLY
      placesBox.classList.remove("hidden");

      // IMPORTANT FIX
      placesBox.style.display = "grid";

      // Clear Old Data
      placesBox.innerHTML = "";

      // LOOP
      for (let place of data.features) {

        // Default Image
        let imageUrl =
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop";

        try {

          const query = place.properties.name
            ? `${place.properties.name} ${city} tourist place`
            : `${city} tourism`;

          // Fetch Unsplash Image
          const unsplashRes = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UnsplashAPI_KEY}`
          );

          const unsplashData = await unsplashRes.json();

          if (
            unsplashData.results &&
            unsplashData.results.length > 0
          ) {

            imageUrl = unsplashData.results[0].urls.regular;

          }

        } catch (error) {

          console.log("Unsplash Error:", error);

        }

        // CREATE CARD
        const div = document.createElement("div");

        div.className =
          "bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300";

        div.innerHTML = `
          <img
            src="${imageUrl}"
            alt="${place.properties.name || "Tourist Place"}"
            class="w-full"
            style="
              height:220px;
              object-fit:cover;
            "
          />

          <div class="p-4">

            <h3 class="text-lg font-bold text-green-700 mb-2">
              ${place.properties.name || "Tourist Place"}
            </h3>

            <p class="text-gray-600 text-sm">
              ${place.properties.city || city}
            </p>

          </div>
        `;

        placesBox.appendChild(div);
      }

    } catch (error) {

      console.log("Places Error:", error);

      loading.classList.add("hidden");

      errors.textContent = error.message;

      errors.classList.remove("hidden");
    }
  }

  fetchPlaces(city);
}

// 93f6a31c36294d2fa8041407fcc02f6a geoapify


// let WeatherAPI_KEY = "129f1a10779aab509c330e108de1e6d6";
// let UnsplashAPI_KEY = "TJnyqjO62gMWScQFii89PPSMigwtNqNrxEMaKIzPNZE";
// let GeoapifyAPI_KEY = "93f6a31c36294d2fa8041407fcc02f6a";