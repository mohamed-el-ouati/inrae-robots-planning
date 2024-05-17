"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useTaskStore from "@/lib/store/TaskStore";
import Timeline from "@/components/Timeline";
import GanttChart from "@/components/GanttChart";
import { convertOjectToKeyValueArray } from "@/lib/utils/utils";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  } = useSWR(`${baseUrl}/itks/${params.id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <div className="w-full h-full">
      {/* <div className="flex pb-4 justify-between gap-4">
      <h1 className="text-4xl font-semibold">ITK Planning</h1>
    </div> */}

      <Card className="w-full h-full pt-6">
        <CardContent>
          <CardTitle className="text-3xl">{itk[0].itk_name}</CardTitle>
          <div className="flex w-full justify-center">
            <Timeline tasks={itk} />
          </div>
          <GanttChart data={itk} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ItkPage;
