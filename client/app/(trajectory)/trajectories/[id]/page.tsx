"use client";

import TrajectoryMap from "../../../../components/TrajectoryMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type TrajectoryPageProps = {
  params: {
    id: string;
  };
};

const mapStyles = {
  height: "60vh",
  maxHeight: 700,
  borderRadius: 10,
};

const trajectoryPage = ({ params }: TrajectoryPageProps) => {
  const url = `${baseUrl}/trajectories/${params.id}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const plotName = data[0].plot_name;
  const id = data[0].id;
  const trajName = data[0].traj_name;

  return (
    <Card className={"w-full lg:w-3/4 xl:w-3/6 "}>
      <CardHeader className="flex flex-row flex-wrap justify-between items-center">
        <CardTitle className="text-3xl">Trajectory Details</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"flex items-center flex-col flex-wrap gap-8"}>
        <ul className="flex w-full flex-col gap-4">
          <li className="flex justify-between">
            <p className="font-medium leading-none">ID :</p>
            <p className="text-muted-foreground">{id}</p>
          </li>
          <li className="flex justify-between">
            <p className="font-medium leading-none">Name :</p>
            <p className="text-muted-foreground"> {trajName}</p>
          </li>
          <li className="flex justify-between">
            <p className="font-medium leading-none">Plot :</p>
            <p className="text-muted-foreground">{plotName}</p>
          </li>
        </ul>
        <TrajectoryMap trajectoryData={data} styles={mapStyles} />
      </CardContent>
    </Card>
  );
};

export default trajectoryPage;
