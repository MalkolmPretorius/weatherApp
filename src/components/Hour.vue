<script setup>
import { ref } from "vue";
import  ForecastsStore  from "@/stores/forecastsStore";

const forecast = ref(null);

const fetchForecast = async () => {
    forecast.value = await ForecastsStore.getForecast();
    console.log(forecast?.value);
};

const formatHour = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = date.getDate();
  const month = date.getMonth()+1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}
  ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

fetchForecast();
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex space-x-8">
      <!-- Blocs de prévisions horaires ici -->
      <div class="text-center" v-for="hourlyForecast in forecast?.forecastList">
        <p class="text-lg">{{ formatHour(hourlyForecast.dt_txt) }}</p>
        <img class="weather-icon" :src="`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`" alt="weather_icon">
        <p class="text-lg">{{hourlyForecast.main.temp }}°C</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-icon {
  width: 60px; 
  height: 60px; 
  background-color: lightblue;
  border-radius: 50%;}
</style>