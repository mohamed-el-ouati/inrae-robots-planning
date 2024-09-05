"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Requests } from "../../../lib/types/index";

export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "priority",
    header: "priority",
  },
  {
    accessorKey: "starttime",
    header: "starttime",
  },
  {
    accessorKey: "plot_id",
    header: "plot_id",
  },
]; 
