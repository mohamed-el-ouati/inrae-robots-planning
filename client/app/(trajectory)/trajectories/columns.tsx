"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Trajectory } from "../../../lib/types/index";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const columns: ColumnDef<Trajectory>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "plot_name",
    header: "Plot",
  },
  {
    accessorKey: "robot_name",
    header: "Robot",
  },
  {
    accessorKey: "activity_name",
    header: "Activity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const trajectory = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const ViewInMap = (id: number) => {
        router.push("/trajectories/" + id);
      };

      const UpdateTrajectory = (id: number) => {
        router.push("/update-trajectory/" + id);
      };

      const DeleteTrajectory = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete trajectory ${name}?`)) {
          try {
            const tajectoryRefResponse = await fetch(
              `/api/trajectories/ref/${id}`,
              {
                method: "DELETE",
              }
            );

            const tajectoryPointsResponse = await fetch(
              `/api/trajectories/points/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!tajectoryRefResponse.ok || !tajectoryPointsResponse.ok)
              throw new Error("Failed to delete the robot");

            toast({
              title: "Trajectory deleted successfully!",
            });
            router.refresh();
          } catch (error) {
            toast({
              title: "There was an error deleting the trajectory.",
              variant: "destructive",
            });
          }
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => ViewInMap(trajectory.id)}>
              View in Map
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => UpdateTrajectory(trajectory.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                DeleteTrajectory(trajectory.id, trajectory.traj_name);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
