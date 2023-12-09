import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useEffect, useRef } from "react";
import "./PlacesSearchBar.css";

const PlacesSearchBar = ({ handleCrimeLocation }) => {
  // Set the MapBox Access Token. This is present in your MapBox Account
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWZhYW4wMDciLCJhIjoiY2t5NXBxZmduMG81ZjJ4b25mbjd2aW8yOSJ9.yxrkp9nmvfPFHq1aXPEIeQ";

  // create a reference for the map
  const geocoder = useRef(null);

  useEffect(() => {
    if (geocoder.current !== null) return;

    // Add the control to the map.
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: "region,place,postcode,locality,neighborhood",
    });

    geocoder.current.addTo(document.getElementById("geocoder"));

    // Add geocoder result to container.
    geocoder.current.on("result", (e) => {
      console.log(e.result.geometry.coordinates);
      handleCrimeLocation(
        e.result.geometry.coordinates[0],
        e.result.geometry.coordinates[1]
      );
    });

    // Clear results container when search is cleared.
    geocoder.current.on("clear", (e) => {});
  }, []);

  return (
    <>
      <div id="geocoder"></div>
      <pre id="result"></pre>
    </>
  );
};

export default PlacesSearchBar;
