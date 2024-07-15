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
import SelectFormStep from "./_steps/SelectFormStep";
import { formatDate, splitNameAndId } from "@/lib/utils/utils";
import RobotFormStep from "./_steps/RobotStep";
import useTaskStore from "@/lib/store/TaskStore";
import PlotStep from "./_steps/PlotStep";
import usePlotStore from "@/lib/store/PlotStore";
import useTrajectoryStore from "@/lib/store/TrajectoryStore";
import TrajectoryStep from "./_steps/TrajectoryStep";
import ActivityStep from "./_steps/ActivityStep";
import EquipmentStep from "./_steps/EquipmentStep";
import { useState } from "react";

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
      activity_category: "",
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
  const plot = usePlotStore((state) => state.plot);
  const trajectory = useTrajectoryStore((state) => state.trajectory);
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
    <TimeStep form={form} />,
    // <SelectFormStep
    //   form={form}
    //   name="activity"
    //   url={`${baseUrl}/activities/available`}
    // />,
    <ActivityStep form={form} name="activity" />,
    <RobotFormStep
      form={form}
      url={`${baseUrl}/robots/available?start=${startDate}&end=${endDate}`}
    />,
    // <SelectFormStep
    //   form={form}
    //   name="equipment"
    //   url={`${baseUrl}/equipments/available?start=${startDate}&end=${endDate}`}
    // />,
    <EquipmentStep
      form={form}
      url={`${baseUrl}/equipments/available?start=${startDate}&end=${endDate}`}
    />,
    <PlotStep />,
    <TrajectoryStep
    // form={form}
    // url={`${baseUrl}/trajectories/available?end=${endDate}&start=${startDate}&plot_id=${plot?.id}`}
    />,
  ]);

  const addTask = useTaskStore((s) => s.addTask);
  const [error, setError] = useState<string | null>(null);

  const validateDates = () => {
    const start_date = form.getValues("start_date");
    const end_date = form.getValues("end_date");
    if (end_date && start_date && end_date <= start_date) {
      setError("End date must be later than start date"!);
      return false;
    }
    setError(null);
    return true;
  };

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!validateDates()) return;
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
