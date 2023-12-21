// @/stores/favoritesStore.js
import { ref } from "vue";

const favorites = ref([]);
const apiKey = "b03cfe90fa426f35a897f7d716bdc1d5";


const addFavorite = (favorite) => {
  favorites.value.unshift(favorite);
  saveFavoritesToLocalStorage();
};

const removeFavorite = (favorite) => {
  const index = favorites.value.findIndex((e) => e === favorite);
  if (index !== -1) {
    favorites.value.splice(index, 1);
    saveFavoritesToLocalStorage();
  }
};

const clearFavorites = () => {
    favorites.value.splice(0, favorites.value.length);
    saveFavoritesToLocalStorage();
  };

const getFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const saveFavoritesToLocalStorage = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

const getCoordinatesForLocation = async (location) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
  const data = await response.json();
    return {
      latitude: data[0].lat,
      longitude: data[0].lon
    };
};

export {
  favorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
  getFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
  getCoordinatesForLocation,
};
