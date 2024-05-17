import React, { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { formatDateString } from "@/lib/utils/utils";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getItks() {
  const res = await fetch(`${baseUrl}/itks`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const page = async () => {
  const itks = await getItks();

  itks.forEach((itk: any) => {
    if (itk.itk_start_date) {
      itk.itk_start_date = formatDateString(itk.itk_start_date);
    }
    if (itk.itk_end_date) {
      itk.itk_end_date = formatDateString(itk.itk_end_date);
    }
  });

  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Planned ITKs</h1>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable columns={columns} data={itks} />
      </Suspense>
    </div>
  );
};

export default page;
