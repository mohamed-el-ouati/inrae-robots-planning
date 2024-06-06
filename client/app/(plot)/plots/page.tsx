"use client";

import { Button } from "@/components/ui/button";
import TrajectoryMap from "../../../components/SelectTrajectoryMap";
import Link from "next/link";
import { useState } from "react";
import ListView from "./ListView";
import MapView from "./MapView";
const trajectoriesPage = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [view, setView] = useState("map");

  const url = `${baseUrl}/trajectories/`;
  const mapStyles = {
    height: "80vh",
    maxHeight: 700,
    borderRadius: 10,
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex pb-4 justify-between gap-4">
        <div className="flex gap-4">
          <h1 className="text-4xl font-semibold">Plots</h1>
          <div className="flex gap-2">
            <Button
              variant={view === "map" ? "ghost" : "outline"}
              onClick={() => setView("map")}
            >
              Map view
            </Button>
            <Button
              variant={view === "list" ? "ghost" : "outline"}
              onClick={() => setView("list")}
            >
              List view
            </Button>
          </div>
        </div>
        {/* <Button asChild>
          <Link href="/">Add a new Plot</Link>
        </Button> */}
      </div>
      {view == "map" && <MapView />}
      {view == "list" && <ListView />}
    </div>
  );
};

export default trajectoriesPage;
