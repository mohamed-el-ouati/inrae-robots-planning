import TrajectoryMap from "@/components/TrajectoryMap";
import React from "react";

const TrajectoryStep = () => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold">Trajectory</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        Select a trajectory on the map.
      </p>
      <TrajectoryMap />
    </div>
  );
};

export default TrajectoryStep;
