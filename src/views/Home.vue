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
  </div>
  <div class="fixed inset-x-5 bottom-0 pb-4 flex justify-end">
    <button
      class="bg-blue-500 bg-opacity-90 hover:bg-blue-700 text-white p-4 h-auto w-auto leading-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-2xl"
    >
      <router-link :to="{ name: 'favoris' }"><span class="hidden md:block">Favorite List</span> <span class="block md:hidden">+</span></router-link>
    </button>
    
  </div>
</template>
