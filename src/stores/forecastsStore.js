import { reactive } from "vue";
import CoordsStore from "@/stores/coords.js";

const apiKey = "b03cfe90fa426f35a897f7d716bdc1d5";

export const ForecastsStore = reactive({
  getForecast: async function () {
    await CoordsStore.fetchCoords();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric&cnt=14`
    );
    const forecast = await response.json();
    return {
     forecastList:forecast.list
    };
  },
});
export default ForecastsStore;
