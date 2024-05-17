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

  const router = useRouter();
  const { toast } = useToast();

  const [itkName, setItkName] = useState("");

  const HandleTaskInsertion = async (task: any, itkId: number) => {
    // Insert data into the configurations table
    const configurationResponse = await fetch(`${baseUrl}/configurations`, {
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
      console.error("Failed to insert configuration");
      return;
    }

    const configurationData = await configurationResponse.json();
    const configurationId = configurationData.id;

    // Insert data into the configurations-ref table
    const trajectoryResponse = await fetch(`${baseUrl}/configurations-ref`, {
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
      console.error("Failed to insert trajectory");
      return;
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
      const itkResponse = await fetch(`${baseUrl}/itks`, {
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
      const itkId = itkData.id;

      tasks.map((task) => {
        HandleTaskInsertion(task, itkId);
      });
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
