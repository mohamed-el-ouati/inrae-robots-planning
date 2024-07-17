"use client";

import Calendar from "./Calendar";
import { getRandomColor } from "@/lib/utils/utils";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const CalenderPage = () => {
  const { data: tasks, error, isLoading } = useSWR(`/api/tasks`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  const data = tasks.map((event: any) => ({
    id: event.configuration_ref_id,
    title: event.activity_name + " at " + event.plot_name,
    start: event.start_date,
    end: event.end_date,
    color: getRandomColor(),
  }));

  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold mb-4">Calendar</h1>
      <Card className="p-4">
        <CardContent>
          <Calendar events={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalenderPage;
