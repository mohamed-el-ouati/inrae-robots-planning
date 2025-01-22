"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import PlotField from "./PlotField";
import RobotField from "./RobotField";
import EquipmentField from "./EquipmentField";
import TimeStep from "../../add-task/_steps/TimeStep";
import { taskDefaultValues, taskSchema } from "@/lib/validations/task";
import { format } from "date-fns";
import ActivityField from "./ActivityField";

type FormValues = z.infer<typeof taskSchema>;
type UpdateTaskFormProps = {
  params: {
    id: string;
  };
};

const UpdateTaskForm = ({ params }: UpdateTaskFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: taskDefaultValues,
  });
  const { reset } = form;

  const {
    data: task,
    error: taskError,
    isLoading: taskIsLoading,
  } = useSWR(`/api/configurations/${params.id}`, fetcher);

  useEffect(() => {
    if (task) {
      reset({
        activity_category: task.activity_category_id
          ? task.activity_category_id.toString()
          : "",
        activity: task.activity_id ? task.activity_id.toString() : "",
        robot: task.robot_id ? task.robot_id.toString() : "",
        plot: task.plot_id ? task.plot_id.toString() : "",
        equipment: task.equipment_id ? task.equipment_id.toString() : "",
        start_date: task.start_date ? new Date(task.start_date) : new Date(),
        end_date: task.end_date ? new Date(task.end_date) : new Date(),
      });
    }
  }, [task, reset]);

  if (taskIsLoading) return <div>Loading...</div>;
  if (taskError) return <div>Error loading data!</div>;

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`/api/configurations/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity_id: parseInt(values.activity),
          robot_id: parseInt(values.robot),
          plot_id: parseInt(values.plot),
          equipment_id: parseInt(values.equipment),
          start_date: format(values.start_date, "yyyy-MM-dd HH:mm:ss"),
          end_date: format(values.end_date, "yyyy-MM-dd HH:mm:ss"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      toast({
        title: "Task update successfully!",
      });
      router.push(`/tasks/${params.id}`);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error updating task! Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full flex flex-col gap-3"
      >
        <FormLabel className="font-semibold">Activity</FormLabel>
        <ActivityField form={form} />
        <FormLabel className="font-semibold">Plot</FormLabel>
        <PlotField form={form} />
        <TimeStep form={form} />
        <FormLabel className="font-semibold">Robot</FormLabel>
        <RobotField form={form} />
        <FormLabel className="font-semibold">Equipment</FormLabel>
        <EquipmentField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdateTaskForm;
