import UpdateRobotForm from "./UpdateRobotForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getRobotById(id) {
  try {
    const res = await fetch(`${baseUrl}/robots/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for ID ${id}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching robot data:", error);
    return null;
  }
}

const UpdateRobotPage = async ({ params }) => {
  const robot = await getRobotById(params.id);

  if (!robot) {
    return <p>Erreur lors du chargement des données du robot.</p>;
  }

  const defaultValues = {
    name: robot.name,
    description: robot.description || "",
    locomotion: robot.locomotion || "",
    weight_kg: robot.weight_kg || 0,
    length_mm: robot.length_mm || 0,
    width_mm: robot.width_mm || 0,
    height_mm: robot.height_mm || 0,
    max_speed_mps: robot.max_speed_mps || 0,
    autonomy: robot.autonomy || 0,
    manipulation: robot.manipulation || "",
    on_board_sensors: robot.on_board_sensors || "",
    image: robot.image || "",
  };

  return (
    <Card className="min-w-[35%]">
      <CardHeader>
        <CardTitle className="text-3xl">Mise à jour du robot</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateRobotForm defaultValues={defaultValues} robotId={params.id} />
      </CardContent>
    </Card>
  );
};

export default UpdateRobotPage;
