import { create } from "zustand";

interface Trajectory {
  id: number;
  name: string;
}

interface TrajectoryStore {
  trajectory: Trajectory | null;
  setTrajectory: (trajectory: Trajectory) => void;
}

const useTrajectoryStore = create<TrajectoryStore>((set) => ({
  trajectory: null,
  setTrajectory: (trajectory) => set({ trajectory }),
}));

export default useTrajectoryStore;
