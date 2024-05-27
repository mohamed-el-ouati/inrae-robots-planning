import { create } from "zustand";

interface Plot {
  id: number;
  name: string;
}

interface PlotStore {
  plot: Plot | null;
  setPlot: (plot: Plot) => void;
}

const usePlotStore = create<PlotStore>((set) => ({
  plot: null,
  setPlot: (plot) => set({ plot }),
}));

export default usePlotStore;
