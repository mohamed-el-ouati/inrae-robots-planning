"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { equipmentSchema } from "@/lib/validations/equipment";
import EquipmentForm from "../EquipmentForm";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddEquipment = () => {
  const { toast } = useToast();
  const defaultEquipmentValues = {
    name: "",
    working_width_m: 0,
    trailed_or_carried: "",
    required_power_kw: 0,
    number_of_teeth: 0,
    tooth_width_cm: 0,
    capacity_l: 0,
    hitch: "",
    pneumatic: "true",
    power_take_off: "true",
    hitch_ground_clearance: 0,
    weight_kg: 0,
  };

  async function onSubmit(values: z.infer<typeof equipmentSchema>) {
    try {
      const response = await fetch(`${baseUrl}/equipments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again.");
      }
      toast({
        title: "Equipment added successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  }

  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Add a new Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <EquipmentForm
          onSubmit={onSubmit}
          defaultValues={defaultEquipmentValues}
        />
      </CardContent>
    </Card>
  );
};

export default AddEquipment;
