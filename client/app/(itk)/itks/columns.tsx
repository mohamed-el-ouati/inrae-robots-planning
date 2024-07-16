"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RobotEssentials } from "../../../lib/types/index";
import CellActions from "./CellActions"; // Adjust the import path accordingly

export const columns: ColumnDef<RobotEssentials>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "itk_start_date",
    header: "Start date",
  },
  {
    accessorKey: "itk_end_date",
    header: "End date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const itk = row.original;
      return <CellActions itk={itk} />;
    },
  },
];
