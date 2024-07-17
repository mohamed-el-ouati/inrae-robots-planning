"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskForm from "../../(tasks)/tasks/add-task/TaskForm";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useTaskStore from "@/lib/store/TaskStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const addTaskPage = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const deleteAllTasks = useTaskStore((s) => s.deleteAllTasks);

  console.log(tasks);
  const router = useRouter();
  const { toast } = useToast();

  const [itkName, setItkName] = useState("");

  const HandleTaskInsertion = async (task: any, itkId: number) => {
    try {
      // Insert data into the configurations table
      const configurationResponse = await fetch(`/api/configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          robot_id: parseInt(task.robot_id),
          activity_id: parseInt(task.activity_id),
          equipment_id: parseInt(task.equipment_id),
          start_date: task.start_date,
          end_date: task.end_date,
          itk_id: itkId,
        }),
      });

      if (!configurationResponse.ok) {
        throw new Error(
          `Failed to insert configuration: ${await configurationResponse.text()}`
        ); // Get error message from response
      }

      const configurationData = await configurationResponse.json();
      const configurationId = configurationData.id;

      // Insert data into the configurations-ref table
      const trajectoryResponse = await fetch(`/api/configurations-ref`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          configuration_id: configurationId,
          trajectory_ref_id: parseInt(task.trajectory_id),
        }),
      });

      // Check if trajectory insertion was successful
      if (!trajectoryResponse.ok) {
        throw new Error(
          `Failed to insert trajectory: ${await trajectoryResponse.text()}`
        ); // Get error message from response
      }

      console.log(
        `Successfully inserted task with configuration ID ${configurationData.id}`
      );
    } catch (error) {
      console.error("Error inserting task:", error);
    }
  };

  const onFormSubmitITKHandler = async () => {
    if (tasks.length == 0) {
      toast({
        title: "Add at least one task to create an ITK!",
        variant: "destructive",
      });
    } else {
      // Insert data into ITK table
      const itkResponse = await fetch(`/api/itks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itkName,
        }),
      });

      if (!itkResponse.ok) {
        console.error("Failed to insert ITK");
        return;
      }

      const itkData = await itkResponse.json();
      await Promise.all(
        tasks.map((task) => HandleTaskInsertion(task, itkData.id))
      );
      toast({
        title: "ITK created successfully!",
      });
      deleteAllTasks();
      router.push("/itks");
    }
  };

  const cancelHandler = () => {
    deleteAllTasks();
    router.push("/itks");
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full ">
        <CardHeader>
          <CardTitle className="text-3xl">Create an ITK</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl mb-4 font-medium"> ITK Details</h3>
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-md gap-1 flex-col">
              <p className="font-medium">Name</p>
              <Input
                name="itkName"
                placeholder="Enter ITK name"
                onChange={(event) => setItkName(event.target.value)}
              />
            </div>
          </div>
          <Separator className="my-4" />

          <h3 className="text-2xl mb-4 font-medium">Add Tasks</h3>
          <TaskForm />
          <Separator className="my-4" />
          <h3 className="text-2xl mb-4 font-medium">Review and Submit</h3>
          <DataTable columns={columns} data={tasks} />

          <div className="w-full flex justify-end gap-4 py-4">
            <Button variant={"outline"} type="button" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="submit" onClick={onFormSubmitITKHandler}>
              Submit ITK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default addTaskPage;
