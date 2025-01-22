import React from "react";
import SelectTrajectoryMap from "@/components/SelectTrajectoryMap";
import usePlotStore from "@/lib/store/PlotStore";

interface TrajectoryStepProps {
  plot: any; // Adjust 'any' to the specific type of 'plot' if known
}

const TrajectoryStep: React.FC<TrajectoryStepProps> = ({
  plot,
}: TrajectoryStepProps) => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold">Trajectory</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        Select one or more trajectories from the list.
      </p>
      <SelectTrajectoryMap plot={plot} />
    </div>
  );
};

export default TrajectoryStep;
