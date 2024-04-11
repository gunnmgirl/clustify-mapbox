import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import Layers from "app/icons/Layers";

const OpenMapLayerControl = () => {
  const map = useMap();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef?.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="z-1 absolute top-6 right-2 bg-orange-400 flex flex-col cursor-pointer"
    >
      <Layers />
    </div>
  );
};

export default OpenMapLayerControl;
