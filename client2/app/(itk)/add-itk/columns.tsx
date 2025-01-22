"use client";

import { Button } from "@/components/ui/button";
import useTaskStore from "@/lib/store/TaskStore";
import { Task } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "start_date",
    header: "Start date",
  },
  {
    accessorKey: "end_date",
    header: "End date",
  },
  {
    accessorKey: "activity_name",
    header: "Activity",
  },
  {
    accessorKey: "robot_name",
    header: "Robot",
  },
  {
    accessorKey: "equipment_name",
    header: "Equipment",
  },
  {
    accessorKey: "plot_name",
    header: "Plot",
  },
  {
    accessorKey: "trajectory_name",
    header: "Trajectory",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deleteTask = useTaskStore((s) => s.deleteTask);
      const task = row.original;

      return (
        <Button variant={"outline"} onClick={() => deleteTask(task.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
