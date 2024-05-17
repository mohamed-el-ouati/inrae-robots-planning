import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  convertImageDataToBase64,
  formatDuration,
} from "../../../lib/utils/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getRobots() {
  const res = await fetch(`${baseUrl}/robots`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function RobotsPage() {
  const robots = await getRobots();

  // format robots details for display
  robots.forEach((robot: any) => {
    if (robot.recharge_time) {
      robot.recharge_time = formatDuration(robot.recharge_time);
    }
    if (robot.operating_time) {
      robot.operating_time = formatDuration(robot.operating_time);
    }
    if (robot.image_data) {
      robot.image_data = convertImageDataToBase64(robot.image_data.data);
    }
  });

  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Robot Assets</h1>
        <Button asChild>
          <Link href="/add-robot">Add a new Robot</Link>
        </Button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable columns={columns} data={robots} />
      </Suspense>
    </div>
  );
}
