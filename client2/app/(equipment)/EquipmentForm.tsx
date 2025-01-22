"use client";

import { z } from "zod";
import Form from "@/components/form/Form";
import { equipmentSchema } from "@/lib/validations/equipment";

type EquipmentFormProps = {
  onSubmit: (values: z.infer<typeof equipmentSchema>) => void;
  defaultValues?: any;
};

const EquipmentForm = ({ onSubmit, defaultValues }: EquipmentFormProps) => {
  const equipmentFormDefinition = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "working_width_m",
      label: "Working Width (m)",
      type: "number",
    },
    {
      name: "trailed_or_carried",
      label: "Trailed or Carried",
      type: "select",
      options: [
        { id: "Trailed", name: "Trailed", label: "Trailed" },
        { id: "Carried", name: "Carried", label: "Carried" },
      ],
    },
    {
      name: "required_power_kw",
      label: "Required Power (kW)",
      type: "number",
    },
    {
      name: "number_of_teeth",
      label: "Number of Teeth",
      type: "number",
    },
    {
      name: "tooth_width_cm",
      label: "Tooth Width (cm)",
      type: "number",
    },
    {
      name: "capacity_l",
      label: "Capacity (L)",
      type: "number",
    },
    {
      name: "hitch",
      label: "Hitch",
      type: "text",
    },
    {
      name: "pneumatic",
      label: "Pneumatic",
      type: "radio",
    },
    {
      name: "power_take_off",
      label: "Power Take-Off",
      type: "radio",
    },
    {
      name: "hitch_ground_clearance",
      label: "Hitch Ground Clearance",
      type: "number",
    },
    {
      name: "weight_kg",
      label: "Weight (kg)",
      type: "number",
    },
  ];

  return (
    <Form
      formDefinition={equipmentFormDefinition}
      formSchema={equipmentSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  );
};

export default EquipmentForm;
