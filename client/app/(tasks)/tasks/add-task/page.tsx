"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskForm from "./TaskForm";

const addTaskPage = () => {
  return (
    <div className="w-full h-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Task Planning</h1>
      </div>
      <Card className="w-full h-full ">
        <CardHeader>
          <CardTitle className="text-3xl">Add a new Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default addTaskPage;
