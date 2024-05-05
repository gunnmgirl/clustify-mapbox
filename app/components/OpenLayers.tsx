import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { defaults as defaultControls } from "ol/control";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { GeoJSON } from "ol/format";

const OpenLayers = () => {
  useEffect(() => {
    const map = new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      controls: defaultControls(),
    });

    // Add markers
    const markers = [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-122.4, 37.8] },
        properties: {
          type: "red",
        },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-110, 10] },
        properties: {
          type: "green",
        },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-100, 10] },
        properties: {
          type: "red",
        },
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [-140, 15] },
        properties: {
          type: "green",
        },
      },
    ];

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures({
        type: "FeatureCollection",
        features: markers,
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        const type = feature?.values_?.type;
        return new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: type === "red" ? "red" : "green" }),
            stroke: new Stroke({
              color: "white",
              width: 2,
            }),
          }),
        });
      },
    });

    map.addLayer(vectorLayer);

    return () => {
      map.setTarget("");
    };
  }, []);

  return <div id="map-container" style={{ height: "100%" }}></div>;
};

export default OpenLayers;
