"use client";

import { useMultistepForm } from "../../../lib/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { taskSchema } from "@/lib/validations/task";
import dynamic from "next/dynamic";
import { formatDate, splitNameAndId } from "@/lib/utils/utils";
import useTaskStore from "@/lib/store/TaskStore";
import usePlotStore from "@/lib/store/PlotStore";
import useTrajectoryStore from "@/lib/store/TrajectoryStore";
import { useState } from "react";
import PlotStep from "../../(tasks)/tasks/add-task/_steps/PlotStep";
import ActivityStep from "../../(tasks)/tasks/add-task/_steps/ActivityStep";
import RobotAndEquipmentStep from "../../(tasks)/tasks/add-task/_steps/RobotAndEquipmentStep";
import TimeStep from "../../(tasks)/tasks/add-task/_steps/TimeStep";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const StepperComponent = dynamic(
  () => import("../../../components/form/FormStepper"),
  {
    ssr: false,
  }
);

const AddTaskForm = () => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      start_date: new Date("2024-09-01T02:00:00.000Z"),
      end_date: new Date("2024-09-01T02:00:00.000Z"),
      activity_category: "",
      activity: "",
      robot: "",
      equipment: "",
      plot: "",
    },
  });

  const { getValues } = form;
  const values = getValues();
  const startDate = values.start_date ? formatDate(values.start_date) : "";
  const endDate = values.end_date ? formatDate(values.end_date) : "";
  const plot = usePlotStore((state) => state.plot);
  const trajectory = useTrajectoryStore((state) => state.trajectory);
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <ActivityStep form={form} />,
      <PlotStep />,
      <TimeStep form={form} />,
      <RobotAndEquipmentStep
        form={form}
        robotUrl={`/api/robots/available?start=${startDate}&end=${endDate}`}
        equipmentUrl={`/api/equipments/available?start=${startDate}&end=${endDate}`}
      />,
    ]);

  const addTask = useTaskStore((s) => s.addTask);
  const tasks = useTaskStore((s) => s.tasks);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!isLastStep) return next();
    addTask({
      id: 0,
      itk_id: 0,
      start_date: formatDate(values.start_date),
      end_date: formatDate(values.end_date),
      plot_name: plot?.name,
      plot_id: plot?.id,
      activity_name: splitNameAndId(values.activity).name,
      activity_id: splitNameAndId(values.activity).id,
      equipment_name: splitNameAndId(values.equipment).name,
      equipment_id: splitNameAndId(values.equipment).id,
      robot_name: splitNameAndId(values.robot).name,
      robot_id: splitNameAndId(values.robot).id,
      trajectory_name: trajectory?.name,
      trajectory_id: trajectory?.id,
    });
    goTo(0);
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full">
        <StepperComponent
          steps={[
            { label: "Tâche" },
            { label: "Parcelle" },
            { label: "Date" },
            { label: "Robot et équipement" },
          ]}
          activeStep={currentStepIndex}
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl w-full flex flex-col gap-4 items-center"
        >
          {step}
          {error && <p className="text-red-500 text-start">{error}</p>}

          <div className="grid grid-cols-2 gap-4 my-2 z-50 max-w-[400px] w-full">
            <div>
              {!isFirstStep && (
                <Button
                  className="w-full"
                  variant={"outline"}
                  type="button"
                  onClick={back}
                >
                  Retour
                </Button>
              )}
            </div>

            <Button type="submit">{isLastStep ? "Ajouter une tâche" : "Suivant"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddTaskForm;
