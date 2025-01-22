"use client";

import Calendar from "@/components/Calendar";
import { getRandomColor } from "@/lib/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import InputSkeleton from "@/components/InputSkeleton";
import CalendarSkeleton from "@/components/CalendarSkeleton";

export default function Home() {
  const {
    data: tasks,
    error,
    isLoading,
  } = useSWR(`/api/configurations`, fetcher);

  if (isLoading)
    return (
      <div className="w-full">
        <h1 className="text-4xl font-semibold mb-4">Calendrier</h1>
        <CalendarSkeleton />
      </div>
    );

  if (error) return <div>Erreur lors du chargement des données !</div>;

  const data = tasks.map((event: any) => ({
    id: event.id,
    title: event.activity_name + " at " + event.plot_name,
    start: event.start_date,
    end: event.end_date,
    color: getRandomColor(),
  }));

  return (
    <main className="w-full">
      <h1 className="text-4xl font-semibold mb-4">Calendrier</h1>
      <Card className="p-4">
        <CardContent>
          <Calendar events={data} />
        </CardContent>
      </Card>
    </main>
  );
}
