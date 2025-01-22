"use client";

import { useMultistepForm } from "../../../../lib/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TimeStep from "./_steps/TimeStep";
import { taskSchema } from "@/lib/validations/task";
import dynamic from "next/dynamic";
import { formatDate, splitNameAndId } from "@/lib/utils/utils";
import PlotStep from "./_steps/PlotStep";
import usePlotStore from "@/lib/store/PlotStore";
import RobotAndEquipmentStep from "./_steps/RobotAndEquipmentStep";
import { useState } from "react";
import ActivityStep from "./_steps/ActivityStep";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const StepperComponent = dynamic(
  () => import("../../../../components/form/FormStepper"),
  {
    ssr: false,
  }
);

const TaskForm = () => {
  const router = useRouter();

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

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!isLastStep) return next();

    try {
      const configurationResponse = await fetch(`/api/configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: formatDate(values.start_date),
          end_date: formatDate(values.end_date),
          plot_id: plot?.id,
          activity_id: splitNameAndId(values.activity).id,
          equipment_id: splitNameAndId(values.equipment).id,
          robot_id: splitNameAndId(values.robot).id,
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

    router.push("/");
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full">
        <StepperComponent
          steps={[
            { label: "Activity" },
            { label: "Plot" },
            { label: "Time" },
            { label: "Robot & Equipment" },
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
                  Back
                </Button>
              )}
            </div>

            <Button type="submit">{isLastStep ? "Add Task" : "Next"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
