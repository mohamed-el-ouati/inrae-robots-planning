"use client";

import { DataTable } from "@/components/data-table";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const activitiesPage = () => {
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR(`/api/activities`, fetcher);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des données !</div>;
  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Opérations culturales</h1>
        <Button asChild>
          <Link href="/add-activity">Ajouter une nouvelle activité</Link>
        </Button>
      </div>
      <Suspense fallback={<p>Chargement...</p>}>
        <DataTable columns={columns} data={activities} />
      </Suspense>
    </div>
  );
};

export default activitiesPage;
