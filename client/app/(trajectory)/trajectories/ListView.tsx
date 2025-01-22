import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Suspense } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const url = `/api/trajectories/`;

const ListView = () => {
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
};

export default ListView;
