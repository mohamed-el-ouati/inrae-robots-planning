"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SelectTraj from "./SelectTraj";
import useReferenceTrajectoryStore from "@/lib/store/ReferenceTrajectory";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface TrajectoryData {
  // Define the structure of the trajectory data here
  // For example:
  id: number;
  name: string;
  // Add more fields as necessary
}

const Pages: React.FC = () => {
  const referenceTrajectory = useReferenceTrajectoryStore(
    (state) => state.referenceTrajectory
  );
  const [fetchUrl, setFetchUrl] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR<TrajectoryData>(
    fetchUrl,
    fetchUrl ? fetcher : null
  );

  const handleClick = () => {
    const url = `/api/trajectories/points/trajectory/${referenceTrajectory?.id}`;
    setFetchUrl(url);
    console.log(referenceTrajectory?.id);
  };

  const handleDownload = () => {
    if (!data) return;

    // Convert data to a string format
    const dataString = JSON.stringify(data, null, 2);

    // Create a Blob object
    const blob = new Blob([dataString], { type: "text/plain;charset=utf-8" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "trajectory-data.txt"; // Specify the file name
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Reference Trajectory</h1>
      <SelectTraj />
      <Button className="w-fit self-center mt-6" onClick={handleClick}>
        Fetch Reference Trajectory
      </Button>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {data && (
        <div>
          <Button className="w-fit self-center mt-6" onClick={handleDownload}>
            Download Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pages;
