import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  addTask: (task: any) => void;
  deleteTask: (taskId: number) => void;
  deleteAllTasks: () => void;
}

let currentId = 1;

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: currentId++ }],
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  deleteAllTasks: () => set({ tasks: [] }),
}));

export default useTaskStore;
