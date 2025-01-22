"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import placeholderImg from "../../../public/images/placeholder.png";
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
import { RobotEssentials } from "../../../lib/types/index";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const columns: ColumnDef<RobotEssentials>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("image") || placeholderImg}
          alt="Robot"
          width={84}
          height={84}
          className="aspect-square rounded-md object-cover"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "locomotion",
    header: "Locomotion mode",
  },

  {
    accessorKey: "max_speed_mps",
    header: "Max speed (MPS)",
  },
  {
    accessorKey: "weight_kg",
    header: "Weight (kg)",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const robot = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const ViewRobot = (id: number) => {
        router.push("/robots/" + id);
      };
      const UpdateRobot = (id: number) => {
        router.push("/update-robot/" + id);
      };
      const DeleteRobot = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete robot ${name}?`)) {
          try {
            const response = await fetch(`/api/robots/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete the robot");
            toast({
              title: "Robot deleted successfully!",
            });
          } catch (error) {
            toast({
              title: "There was an error deleting the robot.",
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
            <DropdownMenuItem onClick={() => ViewRobot(robot.id)}>
              View robot details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => UpdateRobot(robot.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                DeleteRobot(robot.id, robot.name);
                router.refresh();
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
