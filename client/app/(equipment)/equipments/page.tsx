"use client";

import { DataTable } from "@/components/data-table";
import { convertImageDataToBase64 } from "@/lib/utils/utils";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getEquipments() {
  const res = await fetch(`${baseUrl}/equipments`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const equipmentsPage = async () => {
  const equipments = await getEquipments();

  equipments.forEach((equipment: any) => {
    if (equipment.image) {
      equipment.image = convertImageDataToBase64(equipment.image.data);
    }
  });

  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Equipments</h1>
        <Button asChild>
          <Link href="/add-equipment">Add a new Equipment</Link>
        </Button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable columns={columns} data={equipments} />
      </Suspense>
    </div>
  );
};

export default equipmentsPage;
