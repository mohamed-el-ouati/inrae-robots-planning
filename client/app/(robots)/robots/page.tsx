"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  convertImageDataToBase64,
  formatDuration,
} from "../../../lib/utils/utils";

export default function RobotsPage() {
  const { data: robots, error, isLoading } = useSWR("/api/robots", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  // format robots details for display
  robots.forEach((robot: any) => {
    if (robot.recharge_time) {
      robot.recharge_time = formatDuration(robot.recharge_time);
    }
    if (robot.operating_time) {
      robot.operating_time = formatDuration(robot.operating_time);
    }
    if (robot.image_data && robot.image_data.data) {
      robot.image_data = convertImageDataToBase64(robot.image_data.data);
    }
  });

  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Robots</h1>
        <Button asChild>
          <Link href="/add-robot">Add a new Robot</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={robots} />
    </div>
  );
}
