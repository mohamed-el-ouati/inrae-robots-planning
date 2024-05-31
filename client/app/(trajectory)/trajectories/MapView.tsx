import React from "react";
import TrajectoryMap from "../../../components/TrajectoryMap";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const mapStyles = {
  height: "60vh",
  maxHeight: 700,
  borderRadius: 10,
};
const MapView = () => {
  const url = `${baseUrl}/trajectories`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <TrajectoryMap data={data} isMontoldre={true} styles={mapStyles} />;
};

export default MapView;
