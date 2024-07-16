import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import placeholderImg from "../../../public/images/placeholder.png";
import { Activity } from "../../../lib/types/index";
import CellActions from "./CellActions"; // Adjust the import path accordingly

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
      return <CellActions activity={activity} />;
    },
  },
];
