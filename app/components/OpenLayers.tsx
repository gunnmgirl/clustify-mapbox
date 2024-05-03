import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { defaults as defaultControls } from "ol/control";

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
    return () => {
      map.setTarget("");
    };
  }, []);

  return <div id="map-container" style={{ height: "100%" }}></div>;
};

export default OpenLayers;
