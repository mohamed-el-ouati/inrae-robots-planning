"use client";

import { DataTable } from "@/components/data-table";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getActivities() {
  const res = await fetch(`${baseUrl}/activities/infos`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const activitiesPage = async () => {
  const activities = await getActivities();

  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Activities</h1>
        <Button asChild>
          <Link href="/add-activity">Add a new Activity</Link>
        </Button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable columns={columns} data={activities} />
      </Suspense>
    </div>
  );
};

export default activitiesPage;
