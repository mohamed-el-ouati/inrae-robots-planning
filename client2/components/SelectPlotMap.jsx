"use client";
import { fetcher } from "@/lib/fetcher";
import { useRef, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import useSWR from "swr";
import { Geometry } from "wkx";
import "mapbox-gl/dist/mapbox-gl.css";
import usePlotStore from "@/lib/store/PlotStore";
import {
  layerStyle,
  layerOutlineStyle,
  textLayerStyle,
} from "./plot-map-style";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const SelectPlotMap = () => {
  const mapRef = useRef(null);
  const [clickedFeatureId, setClickedFeatureId] = useState(null);
  const setPlot = usePlotStore((state) => state.setPlot);
  const { data, error, isLoading } = useSWR(`/api/plots`, fetcher);

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
    const features = e.target.queryRenderedFeatures(e.point, {
      layers: ["plot"],
    });
    const clickedId = features[0]?.properties.id;
    const plotName = features[0]?.properties.name;
    setClickedFeatureId(clickedId);
    setPlot({ id: clickedId, name: plotName });
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
      <Source id="plots" type="geojson" data={geojson}>
        <Layer {...layerStyle(clickedFeatureId)} />
        <Layer {...layerOutlineStyle} />
        <Layer {...textLayerStyle} />
      </Source>
    </Map>
  );
};

export default SelectPlotMap;
