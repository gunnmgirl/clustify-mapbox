import { useMap } from "react-leaflet";
import type { Layer } from "leaflet";
import { RefObject } from "react";

const OpenMapFilters = ({
  markerRef,
  circleGroupRef,
  featureGroupRef,
}: {
  markerRef: RefObject<Layer>;
  circleGroupRef: RefObject<Layer>;
  featureGroupRef: RefObject<Layer>;
}) => {
  const map = useMap();
  const layer = markerRef || circleGroupRef || featureGroupRef;

  const handleLayer = () => {
    if (layer?.current) {
      map.addLayer(layer?.current);
    }
  };
  return (
    <div className="z-1 relative bg-red-200 flex justify-between">
      <button onClick={handleLayer}>Layer 1</button>
      <button>Layer 2</button>
      <button>Layer 3</button>
    </div>
  );
};

export default OpenMapFilters;
