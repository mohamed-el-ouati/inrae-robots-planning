import { create } from "zustand";

interface Trajectory {
  id: number;
}

interface ReferenceTrajectoryStore {
  referenceTrajectory: Trajectory | null;
  setReferenceTrajectory: (trajectory: Trajectory) => void;
}

const useReferenceTrajectoryStore = create<ReferenceTrajectoryStore>((set) => ({
  referenceTrajectory: null,
  setReferenceTrajectory: (referenceTrajectory) => set({ referenceTrajectory }),
}));

export default useReferenceTrajectoryStore;
