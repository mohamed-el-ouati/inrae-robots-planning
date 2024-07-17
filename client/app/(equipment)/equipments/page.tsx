"use client";

import { DataTable } from "@/components/data-table";
import { convertImageDataToBase64 } from "@/lib/utils/utils";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const equipmentsPage = () => {
  const {
    data: equipments,
    error,
    isLoading,
  } = useSWR(`/api/equipments`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  equipments.forEach((equipment: any) => {
    if (equipment.image && equipment.image.data) {
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
