"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import React from 'react';
import RequestsTable from "./RequestsTable";

const Page: React.FC = () => {
    const { data, error, isLoading } = useSWR("/api/requests", fetcher);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data!</div>;
    console.log(data);
    return(
    <div className="w-full">
      <h1 className="text-4xl font-semibold mb-4">Requests</h1>
      <RequestsTable />
    </div>
  );
};

export default Page;

