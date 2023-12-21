// WeatherBackgroundStore.js
import { ref } from 'vue';

const weatherDescription = ref(null);

const setWeatherDescription = (description) => {
  weatherDescription.value = description;
};

const getBackgroundImage = () => {
  switch (weatherDescription.value) {
    case 'Drizzle':
    case 'Snow':
      return 'url("./src/assets/backgrounds/snow_day.jpg")';
    case 'Clear':
      return 'url("./src/assets/backgrounds/sky_clear_day.jpg")';
    case 'Rain':
      return 'url("./src/assets/backgrounds/rain_day.jpg")';
    case 'Mist':
      return 'url("./src/assets/backgrounds/mist_day.jpg")';
    case 'Few clouds':
    case 'Clouds':
      return 'url("./src/assets/backgrounds/few_clouds_day.jpg")';
    case 'Broken clouds':
      return 'url("./src/assets/backgrounds/broken_clouds_day.jpg")';
    case 'Scattered clouds':
      return 'url("./src/assets/backgrounds/scattered_clouds_day.jpg")';
    case 'Shower rain':
      return 'url("./src/assets/backgrounds/shower_rain_day.jpg")';
    case 'Thunderstorm':
      return 'url("./src/assets/backgrounds/thunderstorm_day.jpg")';
    default:
      return 'url("./src/assets/backgrounds/sky_clear_night.jpg")';
  }
};

export default { setWeatherDescription, getBackgroundImage, weatherDescription };
