<script setup>
import { ref, watch, onMounted } from 'vue';
import WeatherBackgroundStore from '@/stores/WeatherBackgroundStore.js';
import LocationStore from '@/stores/geoLocation.js';
import CurrentStore from '@/stores/currentStore.js';
import ForecastsStore from '@/stores/forecastsStore';

const coords = ref(null);
const current = ref(null);
const forecast = ref(null);

const fetchCoords = async () => {
  coords.value = await LocationStore.getCoords();
};

const fetchCurrent = async () => {
  current.value = await CurrentStore.getCurrent();
  WeatherBackgroundStore.setWeatherDescription(current.value?.temps);
};

const fetchForecast = async () => {
  forecast.value = await ForecastsStore.getForecast();
};

onMounted(() => {
  fetchCoords();
  fetchCurrent();
  fetchForecast();
});

watch(coords, async () => {
  await fetchCurrent();
  WeatherBackgroundStore.setWeatherDescription(current.value.temps);
});
</script>

<template>
  <div :style="{ backgroundImage: WeatherBackgroundStore.getBackgroundImage() }">
    <router-view></router-view>
  </div>
</template>

<style scoped>
div {
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
li:hover {
  color: blue;
  text-decoration: underline;
}
</style>
