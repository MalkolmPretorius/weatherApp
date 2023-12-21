<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { removeFavorite } from "@/stores/favoritesStore";
import { CurrentStore } from "@/stores/currentStore.js";
import WeatherBackgroundStore from "@/stores/WeatherBackgroundStore.js"; // Import the WeatherBackgroundStore

const { location } = defineProps(["location"]);
const router = useRouter();

const removeFavoriteHandler = () => {
  removeFavorite(location);
};

const updateCurrentCoords = async () => {
  try {
    await CurrentStore.setCoordsFromFavorite(location);

    // Push the route to 'home'
    router.push({ name: "home" });
    
    // Update the background in WeatherBackgroundStore
    WeatherBackgroundStore.setWeatherDescription(
      CurrentStore.weatherDescription
    );
    console.log(CurrentStore.weatherDescription);
  } catch (error) {
    console.error("Erreur lors de l'obtention des coordonnées:", error);
  }
};
</script>

<template>
  <div
    @dblclick="updateCurrentCoords"
    class="bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg p-4 flex justify-between items-center"
  >
    <span>{{ location }}</span>
    <div>
      <button
        @click="removeFavoriteHandler"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
