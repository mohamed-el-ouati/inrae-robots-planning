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
import { Activity } from "../../../lib/types/index";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "robot",
    header: "Robot",
  },
  {
    accessorKey: "equipment",
    header: "Equipment",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original;
      const router = useRouter();
      const { toast } = useToast();

      // const updateEquipment = (id: number) => {
      //   router.push("/update-equipment/" + id);
      // };

      const deleteActivity = async (id: number) => {
        if (confirm(`Are you sure to delete this activity?`)) {
          try {
            const response = await fetch(`${baseUrl}/activities/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete the Activity");
            router.refresh();
          } catch (error) {
            alert("There was an error!");
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                deleteActivity(activity.id);
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
