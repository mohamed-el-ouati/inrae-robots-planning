"use client";

import { z } from "zod";
import Form from "@/components/form/Form";
import { robotSchema } from "@/lib/validations/robot";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
type RobotFormProps = {
  onSubmit: (values: z.infer<typeof robotSchema>) => void;
  defaultValues?: any;
};

const RobotForm = ({ onSubmit, defaultValues }: RobotFormProps) => {
  const {
    data: powerCategories,
    error: powerCategoriesError,
    isLoading: isPowerCategoriesLoading,
  } = useSWR(`${baseUrl}/robots-power-categories`, fetcher);

  if (isPowerCategoriesLoading) return <div>Loading...</div>;
  if (powerCategoriesError) return <div>Error loading data!</div>;

  const robotFormDefinition = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
    {
      name: "weight",
      label: "Weight",
      type: "number",
    },
    {
      name: "puissance_kwh",
      label: "Puissance (kWh)",
      type: "number",
    },
    {
      name: "recharge_time",
      label: "Recharge Time",
      type: "text",
    },
    {
      name: "operating_time",
      label: "Operating Time",
      type: "text",
    },
    {
      name: "frontaxle_steeringspeed",
      label: "Front Axle Steering Speed",
      type: "number",
    },
    {
      name: "maxangle_steering",
      label: "Max Angle Steering",
      type: "number",
    },
    {
      name: "rearaxle_steeringspeed",
      label: "Rear Axle Steering Speed",
      type: "number",
    },
    {
      name: "id_powercat",
      label: "Power Category",
      type: "select",
      options: powerCategories,
      placeholder: "Select Power Category",
    },
    {
      name: "availableTill",
      label: "Available Till",
      type: "text",
    },
    {
      name: "steering_wheel",
      label: "Steering Wheel",
      type: "number",
    },
    {
      name: "driving_wheel",
      label: "Driving Wheel",
      type: "number",
    },
    {
      name: "dim_length",
      label: "Length",
      type: "number",
    },
    {
      name: "dim_width",
      label: "Width",
      type: "number",
    },
    {
      name: "dim_height",
      label: "Height",
      type: "number",
    },
  ];

  return (
    <Form
      formDefinition={robotFormDefinition}
      formSchema={robotSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default RobotForm;
