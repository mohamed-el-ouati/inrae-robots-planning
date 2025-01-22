"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddTaskForm from "./AddTaskForm";
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
    try {
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
          plot_id: parseInt(task.plot_id),
          itk_id: itkId,
        }),
      });

      if (!configurationResponse.ok) {
        throw new Error(
          `Failed to insert task: ${await configurationResponse.text()}`
        );
      }
    } catch (error) {
      console.error("Error inserting task:", error);
    }
  };

  const onFormSubmitITKHandler = async () => {
    console.log("Submitting ITK with name:", itkName);

    if (tasks.length === 0) {
      toast({
        title: "Add at least one task to create an ITK!",
        variant: "destructive",
      });
      return;
    }

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
      console.error("Failed to insert ITK:", await itkResponse.text());
      return;
    }

    const itkData = await itkResponse.json();
    console.log("ITK created with ID:", itkData.id);

    try {
      await Promise.all(
        tasks.map((task) => HandleTaskInsertion(task, itkData.id))
      );
      toast({
        title: "ITK created successfully!",
      });
    } catch (error) {
      console.error("Error inserting tasks:", error);
      toast({
        title: "Failed to create ITK!",
        variant: "destructive",
      });
    }

    deleteAllTasks();
    router.push("/itks");
  };
  const cancelHandler = () => {
    deleteAllTasks();
    router.push("/itks");
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full ">
        <CardHeader>
          <CardTitle className="text-3xl">Créer un ITK</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl mb-4 font-medium"> Détails de l'ITK</h3>
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-md gap-1 flex-col">
              <p className="font-medium">Nom</p>
              <Input
                name="itkName"
                placeholder="Saisissez le nom ITK"
                onChange={(event) => setItkName(event.target.value)}
              />
            </div>
          </div>
          <Separator className="my-4" />

          <h3 className="text-2xl mb-4 font-medium">Ajouter des tâches</h3>
          <AddTaskForm />
          <Separator className="my-4" />
          <h3 className="text-2xl mb-4 font-medium">Réviser et soumettre</h3>
          <DataTable columns={columns} data={tasks} />

          <div className="w-full flex justify-end gap-4 py-4">
            <Button variant={"outline"} type="button" onClick={cancelHandler}>
            Annuler
            </Button>
            <Button type="submit" onClick={onFormSubmitITKHandler}>
            Soumettre ITK
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default addTaskPage;
