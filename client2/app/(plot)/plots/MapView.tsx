"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import PlotMap from "@/components/PlotMap";

const MapView = () => {
  const { data, error, isLoading } = useSWR(`/api/plots`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <PlotMap data={data} />;
};

export default MapView;
