"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import ListView from "./ListView";
import MapView from "./MapView";

const trajectoriesPage = () => {
  const [view, setView] = useState("map");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex pb-4 justify-between gap-4">
        <div className="flex gap-4">
          <h1 className="text-4xl font-semibold">Trajectories</h1>
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
        <Button asChild>
          <Link href="/add-trajectory">Add a new Trajectory</Link>
        </Button>
      </div>
      {view == "map" && <MapView />}
      {view == "list" && <ListView />}
    </div>
  );
};

export default trajectoriesPage;
