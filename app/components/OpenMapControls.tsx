import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const OpenMapControls = ({ center }: { center: L.LatLngExpression }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleResetZoom = () => {
    map.setView(center);
  };

  useEffect(() => {
    if (divRef?.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="z-1 absolute bottom-6 right-2 w-10 bg-lime-600 flex flex-col gap-4"
    >
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
      <button onClick={handleResetZoom}>Home</button>
    </div>
  );
};

export default OpenMapControls;
