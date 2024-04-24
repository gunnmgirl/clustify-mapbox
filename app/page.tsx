"use client";
import { useState } from "react";
import OpenMap from "app/components/OpenMap";
import MapComponent from "./components/Map";
import OpenLayers from "./components/OpenLayers";

const Home = () => {
  const [tab, setTab] = useState("mapbox");

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <main className="min-h-screen p-24 grid grid-rows-[auto,1fr]">
      <div className="tabs tabs-boxed">
        <button
          className={`tab tab-lg ${tab === "mapbox" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("mapbox")}
        >
          Mapbox
        </button>
        <button
          className={`tab tab-lg ${tab === "leaflet" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("leaflet")}
        >
          Leaflet
        </button>
        <button
          className={`tab tab-lg ${tab === "open-layers" ? "tab-active" : ""}`}
          onClick={() => handleTabChange("open-layers")}
        >
          Open Layers
        </button>
      </div>
      <div className="pt-4">
        {tab === "mapbox" && <MapComponent />}
        {tab === "leaflet" && <OpenMap />}
        {tab === "open-layers" && <OpenLayers />}
      </div>
    </main>
  );
};

export default Home;
