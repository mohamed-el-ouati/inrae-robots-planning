"use client";
import { useMultistepForm } from "../../../../lib/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ConfigurationFormStep from "./_steps/ConfigurationFormStep";
import { taskSchema } from "@/lib/validations/task";
import dynamic from "next/dynamic";
import SelectFormStep from "./_steps/SelectFormStep";
import {
  formatDate,
  formatDateString,
  splitNameAndId,
} from "@/lib/utils/utils";
import RobotFormStep from "./_steps/RobotFormStep";
import useTaskStore from "@/lib/store/TaskStore";
import PlotFormStep from "./_steps/PlotFormStep";
import MapBox from "@/components/MapBox";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const StepperComponent = dynamic(
  () => import("../../../../components/form/FormStepper"),
  {
    ssr: false,
  }
);

const TaskForm = () => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      start_date: new Date("2024-09-01T00:00:00.000Z"),
      end_date: new Date("2024-09-01T00:00:00.000Z"),
      activity: "",
      robot: "",
      equipment: "",
      plot: "",
      trajectory: "",
    },
  });
  const { getValues } = form;
  const values = getValues();
  const startDate = values.start_date ? formatDate(values.start_date) : "";
  const endDate = values.end_date ? formatDate(values.end_date) : "";
  const plot_id = splitNameAndId(values.plot).id;

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm([
    <ConfigurationFormStep form={form} />,
    <SelectFormStep
      form={form}
      name="activity"
      url={`${baseUrl}/activities/available`}
    />,
    <RobotFormStep
      form={form}
      url={`${baseUrl}/robots/available?start=${startDate}&end=${endDate}`}
    />,
    <SelectFormStep
      form={form}
      name="equipment"
      url={`${baseUrl}/equipments/available?start=${startDate}&end=${endDate}`}
    />,
    <PlotFormStep form={form} />,
    <SelectFormStep
      form={form}
      name="trajectory"
      url={`${baseUrl}/trajectories/available/?plot_id=${plot_id}&end=${endDate}&start=${startDate}`}
    />,
  ]);

  const addTask = useTaskStore((s) => s.addTask);

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!isLastStep) return next();
    addTask({
      id: 0,
      itk_id: 0,
      start_date: formatDate(values.start_date),
      end_date: formatDate(values.end_date),
      plot_id: plot_id,
      robot_name: splitNameAndId(values.robot).name,
      activity_name: splitNameAndId(values.activity).name,
      activity_id: splitNameAndId(values.activity).id,
      equipment_name: splitNameAndId(values.equipment).name,
      equipment_id: splitNameAndId(values.equipment).id,
      plot_name: splitNameAndId(values.plot).name,
      robot_id: splitNameAndId(values.robot).id,
      trajectory_name: splitNameAndId(values.trajectory).name,
      trajectory_id: splitNameAndId(values.trajectory).id,
    });
    goTo(0);
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full">
        <StepperComponent
          steps={[
            { label: "Time" },
            { label: "Activity" },
            { label: "Robot" },
            { label: "Equipment" },
            { label: "Plot" },
            { label: "Trajectory" },
          ]}
          activeStep={currentStepIndex}
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl w-full flex flex-col gap-4"
        >
          {step}

          <div className="grid grid-cols-2 gap-4 my-2 z-50">
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
