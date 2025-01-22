"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timeline from "@/components/Timeline";
import GanttChart from "@/components/GanttChart";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type ItkPageProps = {
  params: {
    id: string;
  };
};

const ItkPage = ({ params }: ItkPageProps) => {
  const {
    data: itk,
    error,
    isLoading,
  } = useSWR(`/api/itks/${params.id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <div className="w-full h-full">
      {!itk[0] || itk.message === "ITK not found" ? (
        <div className="text-center">
          There was an error retrieving this ITK.
        </div>
      ) : (
        <Card className="w-full h-full pt-6">
          <CardContent>
            <CardTitle className="text-3xl">{itk[0].itk_name}</CardTitle>
            <div className="flex w-full justify-center">
              <Timeline tasks={itk} />
            </div>
            <GanttChart data={itk} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItkPage;
