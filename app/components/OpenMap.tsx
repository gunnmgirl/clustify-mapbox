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
import "app/styles/openMap.css";

const layerOne = [51.505, -0.09] as LatLngExpression;
const layerTwo = [60, -2] as LatLngExpression;
const layerThree = [40, 1] as LatLngExpression;

const OpenMap = () => {
  const markerRef = useRef<MarkerType>(null);
  const circleGroupRef = useRef<MarkerType>(null);
  const featureGroupRef = useRef<MarkerType>(null);
  return (
    <MapContainer center={layerOne} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Layer 1">
          <Marker position={layerOne} ref={markerRef}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Layer 2">
          <Marker position={layerTwo} ref={circleGroupRef}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Layer 3">
          <Marker position={layerThree} ref={featureGroupRef}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl>
      <OpenMapFilters
        markerRef={markerRef}
        circleGroupRef={circleGroupRef}
        featureGroupRef={featureGroupRef}
      />
    </MapContainer>
  );
};

export default OpenMap;
