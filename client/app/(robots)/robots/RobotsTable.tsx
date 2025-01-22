"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  convertImageDataToBase64,
  formatDuration,
} from "../../../lib/utils/utils";
const RobotsTable = () => {
  const { data: robots, error, isLoading } = useSWR("/api/robots", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;
  // format robots details for display
  robots?.forEach((robot: any) => {
    if (robot.recharge_time) {
      robot.recharge_time = formatDuration(robot.recharge_time);
    }
    if (robot.operating_time) {
      robot.operating_time = formatDuration(robot.operating_time);
    }
    if (robot.image && robot.image.data) {
      robot.image = convertImageDataToBase64(robot.image.data);
    }
  });
  return <DataTable columns={columns} data={robots} />;
};

export default RobotsTable;
