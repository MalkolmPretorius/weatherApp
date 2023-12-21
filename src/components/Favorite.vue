<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { removeFavorite, getCoordinatesForLocation } from "@/stores/favoritesStore";

const { location } = defineProps(["location"]);
const router = useRouter();

const removeFavoriteHandler = () => {
  removeFavorite(location);
};

const updateCurrentCoords = async () => {
  try {
    const coordinates = await getCoordinatesForLocation(location);
    window.alert(`Coordonnées de ${location}: ${coordinates.latitude} ${coordinates.longitude}`);
    console.log(coordinates);
    // router.push({ name: 'home' });
  } catch (error) {
    console.error("Erreur lors de l'obtention des coordonnées:", error);
  }
};
</script>

<template>
  <div @dblclick="updateCurrentCoords" class="bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg p-4 flex justify-between items-center">
    <span>{{ location }}</span>
    <div>
      <button @click="removeFavoriteHandler" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
        Supprimer
      </button>
    </div>
  </div>
</template>
