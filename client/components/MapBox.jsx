"use client";
import { fetcher } from "@/lib/fetcher";
import { useCallback, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import useSWR from "swr";
import { Geometry } from "wkx";

const layerOutlineStyle = {
  id: "outline",
  type: "line",
  layout: {},
  paint: {
    "line-color": "#000",
    "line-width": 1,
  },
};

// Define text layer style
const textLayerStyle = {
  id: "names",
  type: "symbol",
  layout: {
    "text-field": ["get", "name"],
    "text-size": 12,
    "text-offset": [0, 0.6],
    "text-anchor": "top",
    "text-justify": "center",
    "text-padding": 2,
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": "#000000",
    "text-halo-width": 1,
    "text-halo-blur": 1,
    "text-background-color": "#000000",
    "text-background-padding": [2, 2, 2, 2],
  },
};

const MapBox = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [clickedId, setClickedId] = useState(null);

  const { data, error, isLoading } = useSWR(`${baseUrl}/plots`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const parsedData = data.map((item) => {
    const geometry = Geometry.parse(Buffer.from(item.geom, "hex"));
    return {
      type: "Feature",
      geometry: geometry.toGeoJSON(),
      properties: { id: item.id, name: item.name },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features: parsedData,
  };

  const handleClick = (e) => {
    const features = e.target.queryRenderedFeatures(e.point);
    if (features.length > 0) {
      const clickedFeature = features[0];
      const id = clickedFeature.properties.id;
      setClickedId(id);
      console.log(id);
    }
  };

  const layerStyle = {
    id: "plot",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": [
        "case",
        ["==", ["feature-state", "clicked"], true],
        "#ff0000", // Color for clicked polygon
        [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#00ff00", // Color for hover
          "#0080ff", // Default color
        ],
      ],
      "fill-opacity": 0.5,
    },
  };

  return (
    <Map
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: 3.4438053725502584,
        latitude: 46.337344991089594,
        zoom: 13,
      }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ height: 400 }}
      onClick={handleClick}
      attributionControl={false}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
        <Layer {...layerOutlineStyle} />
        <Layer {...textLayerStyle} />
      </Source>
    </Map>
  );
};

export default MapBox;
