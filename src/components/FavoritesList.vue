<script setup>
import Favorite from "./Favorite.vue";
import { ref, onMounted } from "vue";
import { favorites, clearFavorites, getFavoritesFromLocalStorage,getCoordinatesForLocation } from "@/stores/favoritesStore";

const favoriteList = ref([]);

onMounted(() => {
  favorites.value = getFavoritesFromLocalStorage();
  favoriteList.value = favorites.value;
});

const removeAllFavorites = () => {
  clearFavorites();
};


</script>

<template>
  <section class="bg-white bg-opacity-70 rounded-lg shadow p-5">
    <h2 class="font-bold text-xl mb-4">Vos Localisations Favorites</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Favorite v-for="favorite in favoriteList" :key="favorite" :location="favorite"  />
    </div>
    <button @click="removeAllFavorites" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-4">
      Supprimer Toute la Liste
    </button>
  </section>
</template>


