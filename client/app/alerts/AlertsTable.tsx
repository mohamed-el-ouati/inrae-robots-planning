"use client";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { convertImageDataToBase64 } from "@/lib/utils/utils";
import { columns } from "./columns";

const AlertsTable = () => {
  const {
    data: alerts,
    error,
    isLoading,
  } = useSWR(`/api/alerts`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return <DataTable columns={columns} data={alerts} />;
};

export default AlertsTable;
