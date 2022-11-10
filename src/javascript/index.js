import mapboxgl from "mapbox-gl";
import * as dotenv from "dotenv";
dotenv.config();

const addressForm = document.getElementById("addressform");

addressForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let address = document.getElementById("address").value;

  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&types=address&access_token=${process.env.MAPBOX_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.features);

      mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: data.features[0].center, // starting position [lng, lat]
        zoom: 15, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
    });
});
