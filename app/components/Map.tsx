"use client";
import { useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import type { CircleLayer, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.4, 37.8] },
      properties: {},
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-110, 10] },
      properties: {},
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-100, 10] },
      properties: {},
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-140, 15] },
      properties: {
        title: "Test point",
        "marker-symbol": "monument",
      },
    },
  ],
};

const layerStyle: CircleLayer = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3,
  });

  const handleOnMove = (event: ViewStateChangeEvent) => {
    setViewState(event.viewState);
  };

  return (
    <Map
      {...viewState}
      onMove={handleOnMove}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      <Source
        id="custom-data"
        type="geojson"
        data={geojson}
        cluster={true}
        clusterRadius={50}
      >
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
};

export default MapComponent;
