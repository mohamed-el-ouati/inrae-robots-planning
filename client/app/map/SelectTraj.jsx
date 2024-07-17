"use client";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Geometry } from "wkx";
import Map, { Source, Layer } from "react-map-gl";
import { useRef, useState } from "react";
import useTrajectoryStore from "@/lib/store/TrajectoryStore";
import "mapbox-gl/dist/mapbox-gl.css";
import usePlotStore from "@/lib/store/PlotStore";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SelectTraj = () => {
  const mapRef = useRef(null);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
  const setTrajectory = useTrajectoryStore((state) => state.setTrajectory);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const url = `/api/trajectories/`;
  const { data, error, isLoading } = useSWR(url, fetcher);

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

  // Ensure data is an array
  const isDataValid = Array.isArray(data) && data.length > 0;

  // Group points by id
  const groupedPoints = isDataValid
    ? data.reduce((acc, { point, id }) => {
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
      "line-color": [
        "case",
        ["boolean", ["in", ["get", "id"], ["literal", selectedFeatureIds]]],
        "#ff0000",
        "#0000FF",
      ],
      "line-width": 3,
    },
  };

  const handleClick = (e) => {
    const features = e.target.queryRenderedFeatures(e.point);
    const clickedId = features[0]?.properties.id;

    setSelectedFeatureIds((prevSelectedFeatureIds) => {
      if (prevSelectedFeatureIds.includes(clickedId)) {
        return prevSelectedFeatureIds.filter((id) => id !== clickedId);
      } else {
        return [...prevSelectedFeatureIds, clickedId];
      }
    });

    setTrajectory({ id: clickedId, name: "traj" + clickedId });
    console.log("selected trajs : " + selectedFeatureIds);
  };

  const initialCoordinates = trajectoryGeoJSONs.length
    ? trajectoryGeoJSONs[1].geometry.coordinates[1]
    : [3.4438053725502584, 46.337344991089594];

  return (
    <div className="w-full">
      {!isDataValid ? (
        <p className="text-lg font-medium">
          No defined trajectories for this plot!
        </p>
      ) : (
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: initialCoordinates[0],
            latitude: initialCoordinates[1],
            zoom: 15.5,
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
      )}
    </div>
  );
};

export default SelectTraj;
