"use client";
import { useRef } from "react";
import {
  LayerGroup,
  LayerGroupProps,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import OpenMapLayerControl from "./OpenMapLayerControl";
import { LatLngExpression } from "leaflet";
import OpenMapControls from "app/components/OpenMapControls";
import "app/styles/openMap.css";

const layerOne = [51.505, -0.09] as LatLngExpression;

const geojson: { coordinates: LatLngExpression; type: string }[] = [
  { coordinates: [51.505, -0.09], type: "red" },
  { coordinates: [53, -1], type: "red" },
  { coordinates: [49, 1], type: "red" },
  { coordinates: [60, -4], type: "green" },
  { coordinates: [55, -3], type: "green" },
  { coordinates: [64, -2], type: "green" },
  { coordinates: [40, 3], type: "blue" },
  { coordinates: [45, 2], type: "blue" },
  { coordinates: [46, 4], type: "blue" },
];

const data = {
  red: geojson.filter((item) => item.type === "red"),
  green: geojson.filter((item) => item.type === "green"),
  blue: geojson.filter((item) => item.type === "blue"),
};

const OpenMap = () => {
  const blue = useRef(null);
  const green = useRef(null);
  const red = useRef(null);

  return (
    <MapContainer
      center={layerOne}
      zoom={5}
      zoomControl={false}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup ref={red}>
        {data.red.map((item) => (
          <Marker position={item.coordinates}>
            <Popup>
              <div className={`bg-[${item.type}]`}>{item.type}</div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
      <LayerGroup ref={green}>
        {data.green.map((item) => (
          <Marker position={item.coordinates}>
            <Popup>
              <div className={`bg-[${item.type}]`}>{item.type}</div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
      <LayerGroup ref={blue}>
        {data.blue.map((item) => (
          <Marker position={item.coordinates}>
            <Popup>
              <div className={`bg-[${item.type}]`}>{item.type}</div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
      <OpenMapLayerControl blue={blue} green={green} red={red} />
      <OpenMapControls center={layerOne} />
    </MapContainer>
  );
};

export default OpenMap;
