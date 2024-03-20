"use client";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  return (
    <Map
      initialViewState={{
        latitude: 40.67,
        longitude: -103.59,
        zoom: 3,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    />
  );
};

export default MapComponent;
