"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Alerts } from "../../../lib/types/index";

export const columns: ColumnDef<Alerts>[] = [
  {
    accessorKey: "source",
    header: "source",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "variables",
    header: "variables",
  },
  {
    accessorKey: "time",
    header: "time",
  },
];
