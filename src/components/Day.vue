<script setup>
import { ref } from "vue";
import DailyStore from "../stores/daylyStore";

const dailyForecasts = ref(null);

const fetchDaily = async () => {
  dailyForecasts.value = await DailyStore.getDaily();
};

// function qui calcule l'avg par jour sur base des forecasts tous les 3h (array de 40)
const calculateAveragesByDay = (forecasts) => {
  const forecastsByDay = forecasts.reduce((forecastsPerDay, forecast) => {

    // rassemble les mêmes itérations de jour entre elles
    const dateString = forecast.dt_txt.split(" ")[0];

    // crée un object Date sur base de la date que sort l'api pour pouvoir en ressortir le jour
    const date = new Date(dateString);
    const weekDay = date.toLocaleDateString("fr", { weekday: "long" });

    if (!forecastsPerDay[dateString]) {
      forecastsPerDay[dateString] = {
        weekDay,
        forecasts: [],
      };
    }
    forecastsPerDay[dateString].forecasts.push(forecast);

    return forecastsPerDay;
  }, {});

  const averagesByDay = Object.keys(forecastsByDay).map((dateString) => {
    const { weekDay, forecasts } = forecastsByDay[dateString];

    const minTemp =
      forecasts.reduce((sum, forecast) => sum + forecast.main.temp_min, 0) /
      forecasts.length;
    const maxTemp =
      forecasts.reduce((sum, forecast) => sum + forecast.main.temp_max, 0) /
      forecasts.length;

    return {
      dateString,
      weekDay,
      minTemp,
      maxTemp,
    };
  });

  return averagesByDay;
};

const getDailyForecastsList = async () => {
  await fetchDaily();
  dailyForecasts.value = calculateAveragesByDay(dailyForecasts?.value?.list);
  
};


getDailyForecastsList();
</script>

<template>
    <div class="overflow-x-auto">
      <div class="flex space-x-8">
        <div class="text-center" v-for="(daily, index) in dailyForecasts" :key="index">
          <p class="text-lg">{{ daily.weekDay}}</p>
          <div class="w-10 h-10 bg-gray-300 rounded-full mx-auto my-2"></div>
          <p class="text-sm text-blue-500">{{ daily.minTemp ? daily.minTemp.toFixed(1) : "" }}°C</p>
          <p class="text-sm text-red-600">{{ daily.maxTemp ? daily.maxTemp.toFixed(1) : "" }}°C</p>
        </div>
      </div>
    </div>
</template>
