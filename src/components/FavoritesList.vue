<script setup>
import Favorite from "./Favorite.vue";
</script>

<template>
  <!-- Liste des localisations favorites -->
  <section class="bg-white rounded-lg shadow p-5">
    <h2 class="font-bold text-xl mb-4">Vos Localisations Favorites</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Favorite />
    </div>
  </section>
</template>
