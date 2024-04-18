import { useMap } from "react-leaflet";
import type { Layer } from "leaflet";
import { RefObject, useState, useEffect, useRef } from "react";
import L from "leaflet";
import { useForm, SubmitHandler } from "react-hook-form";
import Layers from "app/icons/Layers";

type Input = {
  layer: string[];
};

const OpenMapLayerControl = ({
  blue,
  green,
  red,
}: {
  blue: RefObject<Layer>;
  green: RefObject<Layer>;
  red: RefObject<Layer>;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const map = useMap();
  const [showFilters, setShowFilters] = useState(false);

  const mappedLayers: { [key: string]: RefObject<Layer> } = {
    blue: blue,
    red: red,
    green: green,
  };

  const defaultValues = {
    layer: Object.entries(mappedLayers)
      .filter(([key, value]) => {
        if (value?.current) {
          return map.hasLayer(value.current);
        }
      })
      .map(([key, _]) => key),
  };

  const { register, handleSubmit } = useForm<Input>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    Object.entries(mappedLayers).forEach(([key, ref]) => {
      if (data?.layer?.includes(key)) {
        if (ref?.current) {
          map.addLayer(ref.current);
        }
      } else if (ref?.current) {
        map.removeLayer(ref.current);
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
    <div
      ref={divRef}
      className="z-1 absolute top-6 right-2 flex flex-col items-end cursor-pointer"
    >
      <button className="btn w-30 btn-neutral" onClick={handleFilterButton}>
        <Layers />
        Filter
      </button>
      {showFilters && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 bg-base-200 rounded-lg w-40"
        >
          <ul>
            <li>
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
            <li>
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
            <li>
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
          <button className="btn btn-primary w-[100%] btn-sm" type="submit">
            Filter
          </button>
        </form>
      )}
    </div>
  );
};

export default OpenMapLayerControl;
