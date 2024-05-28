"use client";
import { Map, Layer, Source, NavigationControl, Popup } from "react-map-gl";
import { useRef, useState } from "react";
import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Point,
} from "geojson";
import type {
  CircleLayer,
  GeoJSONSource,
  LayerProps,
  MapLayerMouseEvent,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "app/styles/map.css";

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
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
  ],
};

const layerStyle: CircleLayer = {
  id: "clusters",
  type: "circle",
  source: "custom-data",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
  filter: ["has", "point_count"],
};

const unclusteredPointLayerRed: LayerProps = {
  id: "clusters-red",
  type: "symbol",
  source: "custom-data",
  filter: [
    "all",
    ["!", ["has", "point_count"]],
    ["==", ["get", "type"], "red"],
  ],
  layout: {
    "icon-image": "tw-provincial-expy-2",
    "icon-allow-overlap": false,
  },
};

const unclusteredPointLayerGreen: LayerProps = {
  id: "clusters-green",
  type: "symbol",
  source: "custom-data",
  filter: [
    "all",
    ["!", ["has", "point_count"]],
    ["==", ["get", "type"], "green"],
  ],
  layout: {
    "icon-image": "hu-main-2",
    "icon-allow-overlap": false,
  },
};

export const clusterCountLayer: LayerProps = {
  id: "clusters-count",
  type: "symbol",
  source: "custom-data",
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
};

const isPointGeometry = (
  geometry: GeoJSON.Geometry
): geometry is GeoJSON.Point => {
  return geometry.type === "Point";
};

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);
  const [pointInfo, setPointInfo] = useState<
    Feature<Point, GeoJsonProperties> | undefined
  >(undefined);

  const handleOnClick = (event: MapLayerMouseEvent) => {
    const feature = event?.features?.[0];
    setPointInfo(undefined);

    // zoom in on one click only if it's cluster
    if (feature?.properties?.cluster) {
      const clusterId = feature.properties.cluster_id;

      if (mapRef?.current) {
        const mapboxSource = mapRef?.current?.getSource(
          "custom-data"
        ) as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }

          if (feature.geometry.type === "Point") {
            mapRef.current?.easeTo({
              center: [
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1],
              ],
              zoom,
              duration: 500,
            });
          }
        });
      }
    } else {
      if (feature && isPointGeometry(feature.geometry)) {
        setPointInfo(feature as Feature<Point, GeoJsonProperties>);
      }
    }
  };

  return (
    <Map
      initialViewState={{ longitude: -100, latitude: 40, zoom: 3 }}
      onClick={handleOnClick}
      ref={mapRef}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      interactiveLayerIds={[
        layerStyle.id,
        unclusteredPointLayerRed.id ?? "",
        unclusteredPointLayerGreen.id ?? "",
      ]}
    >
      <Source
        id="custom-data"
        type="geojson"
        data={geojson}
        cluster={true}
        clusterRadius={200}
        clusterMaxZoom={14}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Layer {...layerStyle} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayerRed} />
        <Layer {...unclusteredPointLayerGreen} />
      </Source>
      {pointInfo && (
        <Popup
          longitude={pointInfo.geometry.coordinates[0]}
          latitude={pointInfo.geometry.coordinates[1]}
          anchor="bottom"
          style={{ color: pointInfo?.properties?.type ?? "black" }}
          closeOnClick={false}
        >
          <p>{`type: ${pointInfo?.properties?.type}`}</p>
          <p>{`latitude: ${pointInfo.geometry.coordinates[0]}`}</p>
          <p>{`longitude: ${pointInfo.geometry.coordinates[1]}`}</p>
        </Popup>
      )}
    </Map>
  );
};

export default MapComponent;
