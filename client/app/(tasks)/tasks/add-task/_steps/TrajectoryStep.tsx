import SelectTrajectoryMap from "@/components/SelectTrajectoryMap";

const TrajectoryStep = () => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold">Trajectory</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        Select a trajectory on the map.
      </p>
      <SelectTrajectoryMap />
    </div>
  );
};

export default TrajectoryStep;
