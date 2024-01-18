import { reactive } from "vue";
import CoordsStore from "@/stores/coords.js";

const apiKey = "b03cfe90fa426f35a897f7d716bdc1d5";

export const DailyStore = reactive({
  getDaily: async function () {
    await CoordsStore.fetchCoords();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&units=metric`
    );
    const daily = await response.json();
    return daily;
  },
});
export default DailyStore;
