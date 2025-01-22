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
import { Equipment } from "../../../lib/types/index";

export const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("image") || placeholderImg}
          alt="Equipment"
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
    accessorKey: "working_width_m",
    header: "Working Width (m)",
    cell: ({ row }) => {
      return row.getValue("working_width_m") || "-";
    },
  },
  {
    accessorKey: "required_power_kw",
    header: "Required Power (kW)",
    cell: ({ row }) => {
      return row.getValue("required_power_kw") || "-";
    },
  },
  {
    accessorKey: "hitch_ground_clearance",
    header: "Hitch Ground Clearance",
    cell: ({ row }) => {
      return row.getValue("hitch_ground_clearance") || "-";
    },
  },
  {
    accessorKey: "weight_kg",
    header: "Weight (kg)",
    cell: ({ row }) => {
      return row.getValue("weight_kg") || "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const equipment = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const ViewEquipment = (id: number) => {
        router.push("/equipments/" + id);
      };
      const updateEquipment = (id: number) => {
        router.push("/update-equipment/" + id);
      };

      const deleteEquipment = async (id: number) => {
        if (confirm(`Are you sure to delete this equipment?`)) {
          try {
            const response = await fetch(`/api/equipments/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete the Equipment");
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
            <DropdownMenuItem onClick={() => ViewEquipment(equipment.id)}>
              View equipment details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                updateEquipment(equipment.id);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteEquipment(equipment.id);
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
