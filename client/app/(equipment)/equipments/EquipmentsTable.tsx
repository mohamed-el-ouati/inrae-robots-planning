"use client";
import { DataTable } from "@/components/data-table";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { convertImageDataToBase64 } from "@/lib/utils/utils";
import { columns } from "./columns";

const EquipmentsTable = () => {
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
  return <DataTable columns={columns} data={equipments} />;
};

export default EquipmentsTable;
