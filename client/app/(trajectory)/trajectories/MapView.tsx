"use client";

import React from "react";
import TrajectoryMap from "../../../components/TrajectoryMap";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const mapStyles = {
  height: "60vh",
  maxHeight: 700,
  borderRadius: 10,
};
const MapView = () => {
  const { data, error, isLoading } = useSWR(`/api/trajectories`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <TrajectoryMap
      trajectoryData={data}
      isMontoldre={true}
      styles={mapStyles}
    />
  );
};

export default MapView;
