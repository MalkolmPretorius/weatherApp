<script setup>
import CurrentWeather from "@/components/CurrentWeather.vue";
import HourlyWeather from "@/components/HourlyWeather.vue";
import DailyWeather from "@/components/DailyWeather.vue";
</script>

<template>
  <div class="mx-auto p-4 min-h-screen flex flex-col pb-16">
    <current-weather />
    <hourly-weather />
    <daily-weather />
    <div class="fixed inset-x-0 bottom-0 pb-4 flex justify-center">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl"
      >
        <router-link :to="{ name: 'favoris' }">+</router-link>
      </button>
    </div>
  </div>
</template>

