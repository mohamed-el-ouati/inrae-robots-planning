"use client";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Geometry } from "wkx";
import Map, { Source, Layer } from "react-map-gl";
import { useRef, useState } from "react";
import useTrajectoryStore from "@/lib/store/TrajectoryStore";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const TrajectoryMap = () => {
  const mapRef = useRef(null);
  const [clickedFeatureId, setClickedFeatureId] = useState(null);
  const setTrajectory = useTrajectoryStore((state) => state.setTrajectory);

  const { data, error, isLoading } = useSWR(
    `${baseUrl}/trajectories/points`,
    fetcher
  );

  const convertWKBToCoordinates = (wkbString) => {
    try {
      const buffer = Buffer.from(wkbString, "hex");
      const geometry = Geometry.parse(buffer);
      return geometry.toGeoJSON().coordinates;
    } catch (error) {
      console.error("Error converting WKB to coordinates", error);
      return null;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Group points by id
  const groupedPoints = data.reduce((acc, { point, id }) => {
    if (!acc[id]) acc[id] = [];
    const coordinates = convertWKBToCoordinates(point);
    if (coordinates) acc[id].push(coordinates);
    return acc;
  }, {});

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
      "line-color": [
        "case",
        ["boolean", ["==", ["get", "id"], clickedFeatureId]],
        "#ff0000",
        "#0000FF",
      ],
      "line-width": 2,
    },
  };

  const initialCoordinates = trajectoryGeoJSONs.length
    ? trajectoryGeoJSONs[0].geometry.coordinates[0]
    : [0, 0];

  const handleClick = (e) => {
    const features = e.target.queryRenderedFeatures(e.point);
    const clickedId = features[0]?.properties.id;
    setClickedFeatureId(clickedId);
    setTrajectory({ id: clickedId, name: "traj" + clickedId });
    console.log(clickedId);
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 3.4438053725502584,
        latitude: 46.337344991089594,
        zoom: 13.5,
      }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{
        height: "60vh",
        maxHeight: 700,
        borderRadius: 10,
      }}
      onClick={handleClick}
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
    </Map>
  );
};

export default TrajectoryMap;
