<script setup>
import { ref, onMounted, computed } from "vue";
import DailyStore from "../stores/daylyStore";

const dailyForecasts = ref(null);

const fetchDaily = async () => {
  dailyForecasts.value = await DailyStore.getDaily();
};

const calculateAveragesByDay = (forecasts) => {
  const forecastsByDay = forecasts.reduce((forecastsPerDay, forecast) => {
    const dateString = forecast.dt_txt.split(" ")[0];
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

    const minTemp = Math.min(...forecasts.map((forecast) => forecast.main.temp));
    const maxTemp = Math.max(...forecasts.map((forecast) => forecast.main.temp));
    return {
      dateString,
      weekDay,
      minTemp,
      maxTemp,
      forecasts,
    };
  });

  return averagesByDay;
};

const getDailyForecastsList = async () => {
  await fetchDaily();
  dailyForecasts.value = calculateAveragesByDay(dailyForecasts?.value?.list);
};

onMounted(getDailyForecastsList);

const filteredDailyForecasts = computed(() => {
  const currentDate = new Date();

  if (dailyForecasts.value && Array.isArray(dailyForecasts.value)) {
    // Filtrer les prévisions pour n'inclure que les 4 prochains jours après aujourd'hui
    return dailyForecasts.value.filter((forecast) => {
      const forecastDate = new Date(forecast.dateString);
      return forecastDate > currentDate;
    });
  } else {
    return [];
  }
});
</script>




<template>
  <div class="overflow-x-auto">
    <div class="flex space-x-8">
      <div
        class="text-center"
        v-for="(daily, index) in filteredDailyForecasts"
        :key="index"
      >
        <p class="text-lg">{{daily.weekDay }}</p>

        <div class="w-10 h-10 bg-gray-300 rounded-full mx-auto my-2">
          <img
            v-if="daily && daily.forecasts[0]?.weather[0]?.icon"
            class="weather-icon"
            :src="`https://openweathermap.org/img/wn/${daily.forecasts[0]?.weather[0]?.icon}@2x.png`"
            alt="weather"
          />
        </div>
        <p class="text-sm text-blue-500">
          {{ daily.minTemp ? daily.minTemp.toFixed(1) : "" }}°C
        </p>
        <p class="text-sm text-red-600">
          {{ daily.maxTemp ? daily.maxTemp.toFixed(1) : "" }}°C
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-icon {
  background-color: lightblue;
  border-radius: 50%;
  opacity: 80%;
}
</style>
