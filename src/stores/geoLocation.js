import { reactive } from 'vue';

function getCurrentPosition() {
   return new Promise((resolve, reject) => {
       if (!("geolocation" in navigator)) {
           reject(new Error("Geolocation is not supported by this browser."));
       } else {
           navigator.geolocation.getCurrentPosition(resolve, reject);
       }
   });
}

export const LocationStore = reactive({
   getCoords: async function() {
       try {
           const position = await getCurrentPosition();
           return { 
               latitude: position.coords.latitude, 
               longitude: position.coords.longitude 
           };
       } catch (err) {
           console.error(err); 
           return { 
               latitude: 48.8566,  // Latitude de Paris
               longitude: 2.3522   // Longitude de Paris
           };
       }
   }
});

export default LocationStore;
