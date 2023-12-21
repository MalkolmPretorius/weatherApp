// CurrentStore.js
import { reactive } from "vue";
import CoordsStore from "@/stores/coords.js";
import { addFavorite, getCoordinatesForLocation } from "@/stores/favoritesStore.js";
import WeatherBackgroundStore from "@/stores/WeatherBackgroundStore.js";

const apiKey = "b03cfe90fa426f35a897f7d716bdc1d5";

export const CurrentStore = reactive({
  getCurrent: async function () {
    await CoordsStore.fetchCoords();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric&lang=fr`
    );
    const current = await response.json();
    return {
      Name: current.name,
      temps: current.weather[0].main,
      température: current.main.temp,
      icone: current.weather[0].icon,
    };
  },

  addToFavorites: async function () {
    await CoordsStore.fetchCoords();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric&lang=fr`
    );
    const current = await response.json();
    const favorite = {
      Name: current.name
    };

    addFavorite(favorite.Name);
  },

  setCoordsFromFavorite: async function (location) {
    const favoriteCoords = await getCoordinatesForLocation(location);

    if (favoriteCoords) {
      CoordsStore.coords = favoriteCoords;
      await this.fetchWeatherDescription();
    }
  },

  fetchWeatherDescription: async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric&lang=fr`
    );
    const current = await response.json();
    this.weatherDescription = current.weather[0].main;
    WeatherBackgroundStore.setWeatherDescription(this.weatherDescription);
  },

  weatherDescription: null,
});

export default CurrentStore;
