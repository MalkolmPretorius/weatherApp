<script setup>
import { ref, onMounted } from "vue";
import LocationStore from "@/stores/geoLocation.js";
import CurrentStore from "@/stores/currentStore.js";

const coords = ref(null);
const current = ref(null);

const fetchCoords = async () => {
  try {
    coords.value = await LocationStore.getCoords();
  } catch (err) {}
};

const fetchCurrent = async () => {
  current.value = await CurrentStore.getCurrent();
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

const addToFavorites = async () => {
  try {
    await CurrentStore.addToFavorites();
    window.alert("Position ajoutée aux favoris !");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la position aux favoris :", error);
  }
};

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
        <h3 class="text-xl font-semibold">{{ current?.Name }}</h3>
        <time class="text-lg text-gray-600" datetime="10:00"
          >{{ currentDateWithFormat }}<br />{{ currentHourWithFormat }}</time
        >
      </div>
      <div class="flex">
        <div class="text-right pr-2">
          <p class="text-5xl">
            {{ current?.température ? current.température.toFixed(0) : "" }}°C
          </p>
          <p class="text-xl text-gray-600">{{ current?.temps }}</p>
          <button
            @click="addToFavorites"
            class="text-white-500 fill-current hover:text-red-500 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-4"
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>
          </button>
        </div>
        <!-- Icône météo (à remplacer par une vraie image) -->
        <img
          v-if="current && current.icone"
          class="weather-icon"
          :src="`https://openweathermap.org/img/wn/${current.icone}@2x.png`"
          alt="weather"
        />
      </div>
    </article>
  </section>
</template>

<style scoped>
.weather-icon {
  background-color: lightblue;
  border-radius: 50%;
  opacity: 80%;
}

</style>
