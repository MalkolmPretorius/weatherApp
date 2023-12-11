import { reactive } from "vue";
import CoordsStore from "@/stores/coords.js";

const apiKey = "b03cfe90fa426f35a897f7d716bdc1d5";

export const CurrentStore = reactive({
  getCurrent: async function () {
    await CoordsStore.fetchCoords();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric&lang=fr  `
    );
    const current = await response.json();
    return {
      Name: current.name,
      temps: current.weather[0].description,
      température: current.main.temp,
      icone:current.weather[0].icon,
    };
  },
});
export default CurrentStore;
