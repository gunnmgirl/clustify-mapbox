import { useMap } from "react-leaflet";
import type { Layer } from "leaflet";
import { RefObject, useState, useEffect, useRef } from "react";
import L from "leaflet";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  layer: string[];
};

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
  const [showFilters, setShowFilters] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const mappedLayers: { [key: string]: RefObject<Layer> } = {
    blue: markerRef,
    red: circleGroupRef,
    green: featureGroupRef,
  };
  const { register, handleSubmit } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    Object.entries(mappedLayers).forEach(([key, ref]) => {
      if (data?.layer?.includes(key)) {
        if (ref?.current) {
          map.addLayer(ref.current);
        }
      } else {
        if (ref?.current) {
          map.removeLayer(ref.current);
        }
      }
    });
    setShowFilters(false);
  };

  const handleFilterButton = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    if (divRef?.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, []);

  return (
    <div ref={divRef} className="z-1 relative bg-red-200">
      <button onClick={handleFilterButton}>Filter Types</button>
      {showFilters && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  {...register("layer")}
                  value="blue"
                  id="blue-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="blue-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Blue
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  {...register("layer")}
                  value="red"
                  id="red-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="red-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Red
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  {...register("layer")}
                  value="green"
                  id="green-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="green-checkbox"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Green
                </label>
              </div>
            </li>
          </ul>
          <button className="bg-sky-500 hover:bg-sky-700" type="submit">
            Filter
          </button>
        </form>
      )}
    </div>
  );
};

export default OpenMapFilters;
