<script setup>
import { ref, onMounted } from "vue";
import LocationStore from "@/stores/geoLocation.js";
import CurrentStore from '@/stores/currentStore.js';

const coords = ref(null);
const current = ref(null);

const fetchCoords = async () => {
  try {
    coords.value = await LocationStore.getCoords();
  } catch (err) {
  }
};

const fetchCurrent = async () => {
    current.value = await CurrentStore.getCurrent();
    console.log(current.value);
};

// Mettre à jour l'heure toutes les secondes
const updateCurrentTime = () => {
  const now = new Date();
  currentDateWithFormat.value = now.toLocaleDateString();
  currentHourWithFormat.value = now.toLocaleTimeString();
};

// Mettre à jour l'heure initialement et démarrer le timer
onMounted(() => {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});

fetchCurrent();
fetchCoords();

var currentDateWithFormat = ref("");
var currentHourWithFormat = ref("");

</script>

<template>
  <section
    class="bg-white bg-opacity-70 rounded-lg shadow p-5 mb-6 grow flex flex-col"
    style="flex-grow: 1"
  >
    <header class="mb-4">
      <h2 class="font-bold text-2xl">Météo Instantanée</h2>
    </header>
    <article
      class="flex items-center justify-between grow"
      style="flex-grow: 1"
    >
      <div>
        <h3 class="text-xl font-semibold">{{current?.Name}}</h3>
        <time class="text-lg text-gray-600" datetime="10:00"
          >{{currentDateWithFormat}}<br>{{ currentHourWithFormat }}</time
        >
      </div>
      <div class="flex">
        <div class="text-right pr-2">
          <p class="text-5xl">{{ current?.température ? current.température.toFixed(0) : '' }}°C</p>
          <p class="text-xl text-gray-600">{{current?.temps}}</p>
        </div>
        <!-- Icône météo (à remplacer par une vraie image) -->
        <img v-if="current && current.icone" class="weather-icon" :src="`https://openweathermap.org/img/wn/${current.icone}@2x.png`" alt="weather">
      </div>
    </article>
  </section>
</template>

<style scoped>
.weather-icon {
  background-color: lightblue;
  border-radius: 50%;
  opacity: 80%;}
</style>