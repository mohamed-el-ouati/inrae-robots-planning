"use client";

import Map, { Source, Layer } from "react-map-gl";
import { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertWKBToCoordinates } from "@/lib/utils/map-utils";
import { Geometry } from "wkx";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { layerOutlineStyle, textLayerStyle } from "./plot-map-style";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const TrajectoryMap = ({ trajectoryData, styles, isMontoldre = false }) => {
  const mapRef = useRef(null);
  const isDataValid =
    Array.isArray(trajectoryData) && trajectoryData.length > 0;

  const { data, error, isLoading } = useSWR(`/api/plots`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Plots
  const parsedData = data.map((item) => {
    const geometry = Geometry.parse(Buffer.from(item.geom, "hex"));
    return {
      type: "Feature",
      geometry: geometry.toGeoJSON(),
      properties: { id: item.id, name: item.name },
    };
  });

  const plotsGeoJSONs = {
    type: "FeatureCollection",
    features: parsedData,
  };

  // Trajectories data
  // Group points by id
  const groupedPoints = isDataValid
    ? trajectoryData.reduce((acc, { point, id }) => {
        if (!acc[id]) acc[id] = [];
        const coordinates = convertWKBToCoordinates(point);
        if (coordinates) acc[id].push(coordinates);
        return acc;
      }, {})
    : {};

  // Create GeoJSON features for each trajectory
  const trajectoryGeoJSONs = Object.entries(groupedPoints).map(
    ([id, coordinates]) => ({
      type: "Feature",
      properties: { id },
      geometry: {
        type: "LineString",
        coordinates,
      },
    })
  );

  const layerStyle = {
    id: "trajectory",
    type: "line",
    paint: {
      "line-color": "#0000FF",
      "line-width": 3,
    },
  };

  const initialCoordinates = trajectoryGeoJSONs.length
    ? trajectoryGeoJSONs[0].geometry.coordinates[0]
    : [3.4438053725502584, 46.337344991089594];

  const initialViewStateMontoldre = {
    longitude: 3.4438053725502584,
    latitude: 46.337344991089594,
    zoom: 13.5,
  };

  const initialViewState = {
    longitude: initialCoordinates[0],
    latitude: initialCoordinates[1],
    zoom: 15.5,
  };

  return (
    <div className="w-full">
      {!isDataValid ? (
        <p className="text-lg font-medium">
          No defined trajectories for this plot!
        </p>
      ) : (
        <Map
          ref={mapRef}
          initialViewState={
            isMontoldre ? initialViewStateMontoldre : initialViewState
          }
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{
            ...styles,
          }}
          attributionControl={false}
        >
          {trajectoryGeoJSONs.map((geoJSON, index) => (
            <Source
              key={index}
              id={`trajectory-${index}`}
              type="geojson"
              data={geoJSON}
            >
              <Layer {...layerStyle} id={`layer-${index}`} />
            </Source>
          ))}
          <Source id="plots" type="geojson" data={plotsGeoJSONs}>
            <Layer {...layerOutlineStyle} />
            <Layer {...textLayerStyle} />
          </Source>
        </Map>
      )}
    </div>
  );
};

export default TrajectoryMap;
