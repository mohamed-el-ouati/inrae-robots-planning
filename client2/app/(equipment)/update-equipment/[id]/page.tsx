"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils/utils";
import { robotSchema } from "@/lib/validations/robot";
import { z } from "zod";
import EquipmentForm from "../../EquipmentForm";
import { equipmentSchema } from "@/lib/validations/equipment";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
type updateEquipmentPageProps = {
  params: {
    id: string;
  };
};

async function getEquipmentById(id: string) {
  const res = await fetch(`/api/equipments/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const updateEquipmentPage = async ({ params }: updateEquipmentPageProps) => {
  const equipment = await getEquipmentById(params.id);
  const defaultEquipmentValues = {
    name: equipment.name,
    working_width_m: equipment.working_width_m || 0,
    trailed_or_carried: equipment.trailed_or_carried,
    required_power_kw: equipment.required_power_kw || 0,
    number_of_teeth: equipment.number_of_teeth || 0,
    tooth_width_cm: equipment.tooth_width_cm || 0,
    capacity_l: equipment.capacity_l || 0,
    hitch: equipment.hitch,
    pneumatic: equipment.pneumatic.toString(),
    power_take_off: equipment.power_take_off.toString(),
    hitch_ground_clearance: equipment.hitch_ground_clearance || 0,
    weight_kg: equipment.weight_kg || 0,
  };

  async function onSubmit(values: z.infer<typeof equipmentSchema>) {
    try {
      const response = await fetch(`/api/equipments/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update equipment");
      }

      alert("Equipment updated successfully");
    } catch (error) {
      alert("Failed to update Equipment");
      console.error("Error updating robot:", error);
    }
  }

  return (
    <Card className="min-w-[35%]">
      <CardHeader>
        <CardTitle className="text-3xl">Update Equipment</CardTitle>
      </CardHeader>
      <CardContent>
        <EquipmentForm
          defaultValues={defaultEquipmentValues}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default updateEquipmentPage;
