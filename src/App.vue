<script setup>
import { ref } from "vue";
import LocationStore from "@/stores/geoLocation.js";
import CurrentStore from '@/stores/currentStore.js';
import  ForecastsStore  from "@/stores/forecastsStore";

const coords = ref(null);
const current = ref(null);
const forecast = ref(null);

const fetchCoords = async () => {
  try {
    coords.value = await LocationStore.getCoords();
    console.log(coords.value);
  } catch (err) {
    console.error(err.message);
  }
};

const fetchCurrent = async () => {
    current.value = await CurrentStore.getCurrent();
    console.log(current.value);
};

const fetchForecast = async () => {
    forecast.value = await ForecastsStore.getForecast();
    console.log(forecast.value.forecastList);
};

fetchCoords();
fetchCurrent();
fetchForecast();
</script>

<template>
  <div>
  <router-view></router-view>
  </div>
</template>

<style scoped>
div{
  background-color: lightgrey;

}
ul {
  display: flex;
  justify-content: space-around;
  background-color: #fffbf5;
}
li:hover {
  color: blue;
  text-decoration: underline;
}
</style>
