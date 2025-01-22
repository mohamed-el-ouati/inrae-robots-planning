import { ColumnDef } from "@tanstack/react-table";
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
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original;
      return <CellActions activity={activity} />;
    },
  },
];
