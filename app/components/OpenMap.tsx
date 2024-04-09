"use client";
import { useRef } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import OpenMapFilters from "app/components/OpenMapFilters";
import { LatLngExpression, Marker as MarkerType } from "leaflet";
import OpenMapControls from "app/components/OpenMapControls";
import "app/styles/openMap.css";

const layerOne = [51.505, -0.09] as LatLngExpression;
const layerTwo = [60, -2] as LatLngExpression;
const layerThree = [40, 1] as LatLngExpression;

const OpenMap = () => {
  const markerRef = useRef<MarkerType>(null);
  const circleGroupRef = useRef<MarkerType>(null);
  const featureGroupRef = useRef<MarkerType>(null);
  return (
    <MapContainer
      center={layerOne}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={layerOne} ref={markerRef}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={layerTwo} ref={circleGroupRef}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={layerThree} ref={featureGroupRef}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <OpenMapFilters
        markerRef={markerRef}
        circleGroupRef={circleGroupRef}
        featureGroupRef={featureGroupRef}
      />
      <OpenMapControls center={layerOne} />
    </MapContainer>
  );
};

export default OpenMap;
