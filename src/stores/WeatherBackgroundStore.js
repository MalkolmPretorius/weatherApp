// WeatherBackgroundStore.js
import { ref } from 'vue';

const weatherDescription = ref(null);

const setWeatherDescription = (description) => {
  weatherDescription.value = description;
};

const getBackgroundImage = () => {
  switch (weatherDescription.value) {
    case 'Drizzle':
    case 'snow':
      return 'url("./src/assets/backgrounds/snow_day.jpg")';
    case 'clear':
      return 'url("./src/assets/backgrounds/sky_clear_day.jpg")';
    case 'rain':
      return 'url("./src/assets/backgrounds/rain_day.jpg")';
    case 'mist':
      return 'url("./src/assets/backgrounds/mist_day.jpg")';
    case 'few clouds':
    case 'clouds':
      return 'url("./src/assets/backgrounds/few_clouds_day.jpg")';
    case 'broken clouds':
      return 'url("./src/assets/backgrounds/broken_clouds_day.jpg")';
    case 'scattered clouds':
      return 'url("./src/assets/backgrounds/scattered_clouds_day.jpg")';
    case 'shower rain':
      return 'url("./src/assets/backgrounds/shower_rain_day.jpg")';
    case 'thunderstorm':
      return 'url("./src/assets/backgrounds/thunderstorm_day.jpg")';
    default:
      return 'url("./src/assets/backgrounds/sky_clear_night.jpg")'; 
  }
};

export default { setWeatherDescription, getBackgroundImage };
