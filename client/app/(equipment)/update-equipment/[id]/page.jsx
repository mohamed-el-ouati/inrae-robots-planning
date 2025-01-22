import UpdateEquipmentForm from "./UpdateEquipmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getEquipmentById(id) {
  try {
    const res = await fetch(`${baseUrl}/equipments/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for ID ${id}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching equipment data:", error);
    return null;
  }
}

const UpdateEquipmentPage = async ({ params }) => {
  const equipment = await getEquipmentById(params.id);

  if (!equipment) {
    return <p>Erreur lors du chargement des données de l'équipement.</p>;
  }

  const defaultEquipmentValues = {
    name: equipment.name,
    working_width_m: equipment.working_width_m || 0,
    trailed_or_carried: equipment.trailed_or_carried,
    required_power_kw: equipment.required_power_kw || 0,
    number_of_teeth: equipment.number_of_teeth || 0,
    tooth_width_cm: equipment.tooth_width_cm || 0,
    capacity_l: equipment.capacity_l || 0,
    hitch: equipment.hitch || 0,
    pneumatic: equipment.pneumatic?.toString() || "",
    power_take_off: equipment.power_take_off?.toString() || "",
    hitch_ground_clearance: equipment.hitch_ground_clearance || 0,
    weight_kg: equipment.weight_kg || 0,
  };

  return (
    <Card className="min-w-[35%]">
      <CardHeader>
        <CardTitle className="text-3xl">Mise à jour de l'équipement</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateEquipmentForm
          defaultValues={defaultEquipmentValues}
          equipmentId={params.id}
        />
      </CardContent>
    </Card>
  );
};

export default UpdateEquipmentPage;
