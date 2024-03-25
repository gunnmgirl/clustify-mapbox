"use client";
import { Map, Layer, Source } from "react-map-gl";
import { useRef } from "react";
import type { FeatureCollection } from "geojson";
import type {
  CircleLayer,
  GeoJSONSource,
  LayerProps,
  MapLayerMouseEvent,
  MapRef,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
      properties: {},
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-100, 10] },
      properties: {},
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-140, 15] },
      properties: {
        title: "Test point",
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

const unclusteredPointLayer: LayerProps = {
  id: "clusters-red",
  type: "symbol",
  source: "custom-data",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": "icons8-pin-50",
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

const MapComponent = () => {
  const mapRef = useRef<MapRef>(null);

  const handleOnClick = (event: MapLayerMouseEvent) => {
    const feature = event?.features?.[0];

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
    }
  };

  return (
    <Map
      initialViewState={{ longitude: -100, latitude: 40, zoom: 3 }}
      onClick={handleOnClick}
      ref={mapRef}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      interactiveLayerIds={[layerStyle.id]}
    >
      <Source
        id="custom-data"
        type="geojson"
        data={geojson}
        cluster={true}
        clusterRadius={200}
        clusterMaxZoom={14}
      >
        <Layer {...layerStyle} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
};

export default MapComponent;
