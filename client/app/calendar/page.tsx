import { Suspense } from "react";
import Calendar from "./Calendar";
import { getRandomColor } from "@/lib/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData() {
  const res = await fetch("http://localhost:3001/tasks", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const originalData = await res.json();
  // Transform the data by adding a random color, and formatting dates
  const transformedData = originalData.map((event: any) => ({
    id: event.configuration_ref_id,
    title: event.activity_name + " at " + event.plot_name,
    start: event.start_date,
    end: event.end_date,
    color: getRandomColor(),
  }));

  return transformedData;
}

const CalenderPage = async () => {
  const data = await getData();
  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold mb-4">Calendar</h1>
      <Card className="p-4">
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <Calendar events={data} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalenderPage;
