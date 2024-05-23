import { useMap } from "react-leaflet";
import type { Layer } from "leaflet";
import { RefObject, useState, useEffect, useRef } from "react";
import L from "leaflet";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Layers from "app/icons/Layers";
import { Checkbox } from "./Checkbox";

type Input = {
  layer: string[];
};

const Form = ({
  mappedLayers,
  map,
  setShowFilters,
}: {
  mappedLayers: { [key: string]: RefObject<L.Layer> };
  map: L.Map;
  setShowFilters: any;
}) => {
  const defaultValues = {
    layer: Object.entries(mappedLayers)
      .filter(([_, value]) => {
        if (value?.current) {
          return map.hasLayer(value.current);
        }
      })
      .map(([key, _]) => key),
  };

  const methods = useForm<Input>({
    defaultValues,
  });

  const { handleSubmit } = methods;

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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-2 bg-base-200 rounded-lg w-40"
      >
        <ul>
          <li>
            <div className="flex items-center ps-3">
              <Checkbox value="blue" label="Blue" name="layer" />
            </div>
          </li>
          <li>
            <div className="flex items-center ps-3">
              <Checkbox value="red" label="Red" name="layer" />
            </div>
          </li>
          <li>
            <div className="flex items-center ps-3">
              <Checkbox value="green" label="Green" name="layer" />
            </div>
          </li>
        </ul>
        <button className="btn btn-primary w-[100%] btn-sm" type="submit">
          Filter
        </button>
      </form>
    </FormProvider>
  );
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

  useEffect(() => {
    if (divRef?.current) {
      L.DomEvent.disableClickPropagation(divRef.current);
      L.DomEvent.disableScrollPropagation(divRef.current);
    }
  }, []);

  const handleFilterButton = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div
      ref={divRef}
      className="z-1 absolute top-6 right-2 flex flex-col items-end cursor-pointer"
    >
      <button className="btn w-30 btn-neutral" onClick={handleFilterButton}>
        <Layers />
        <span className="hidden sm:inline">Filter</span>
      </button>
      {showFilters && (
        <Form
          mappedLayers={mappedLayers}
          map={map}
          setShowFilters={setShowFilters}
        />
      )}
    </div>
  );
};

export default OpenMapLayerControl;
