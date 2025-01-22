"use client";

import { formatDateString } from "@/lib/utils/utils";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, Sprout, Calendar } from "lucide-react";
import TrajectoryMap from "@/components/TrajectoryMap";
import RobotCard from "./RobotCard";
import EquipmentCard from "./EquipmentCard";
import { useRouter } from "next/navigation";

type TaskPageProps = {
  params: {
    id: string;
  };
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const transformDataToTask = (data: any): any => {
  return {
    id: data.task_id,
    activity: data.activity_name,
    plot: data.plot_name || "-",
    trajectory: data.trajectory_name,
    trajectory_id: data.trajectory_id,
    robot: data.robot_name || "-",
    equipment: data.equipment_name || "-",
    itk_name: data.itk_name || "-",
    itk_id: data.itk_id || null,
    start_date: formatDateString(data.start_date),
    end_date: formatDateString(data.end_date),
  };
};

const TaskPage: React.FC<TaskPageProps> = ({ params }) => {
  const url = `/api/configurations/${params.id}`;

  const {
    data: configurationData,
    error: configurationDataError,
    isLoading: configurationDataIsLoading,
  } = useSWR(url, fetcher);

  // Fetch trajectory data only if the trajectory_id is available
  const trajectoryUrl = configurationData?.trajectory_id
    ? `/api/trajectories/${configurationData.trajectory_id}`
    : null;
  const {
    data: trajectory,
    error: trajectoryError,
    isLoading: trajectoryIsLoading,
  } = useSWR(trajectoryUrl, fetcher);

  if (configurationDataIsLoading || trajectoryIsLoading)
    return <div>Chargement...</div>;
  if (configurationDataError || trajectoryError)
    return <div>Erreur lors du chargement des données !</div>;
  const router = useRouter();

  const task = transformDataToTask(configurationData);

  const mapStyles = {
    height: "60vh",
    maxHeight: 400,
    borderRadius: 10,
  };

  const deleteTask = () => {
    if (confirm(`Are you sure you want to delete this item?`)) {
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the item");
          }
          // Redirect after successful deletion
          router.push("/");
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error deleting task:", error);
        });
    }
  };

  return (
    <Card className="w-full lg:w-3/4">
      <CardHeader className="flex flex-row flex-wrap justify-between items-center">
        <CardTitle className="text-4xl">Tâche : {task.activity}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`update-task/${task.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Link>
          </Button>
          <Button variant="outline" onClick={() => deleteTask()}>
            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-wrap gap-2">
        <div className="text-lg text-left flex gap-2">
          <Calendar size={26} />
          <p>
          Depuis {task.start_date} à {task.end_date}*
          </p>
        </div>
        {task.itk_id && (
          <div className="text-lg text-left flex gap-2">
            <Sprout size={26} />
            <p>ITK associé : </p>
            <Link
              href={`/itks/${task.itk_id}`}
              className="hover:underline text-blue-800 font-semibold"
            >
              {task.itk_name}
            </Link>
          </div>
        )}

        <h2 className="font-semibold text-lg">Parcelles et trajectoires :</h2>
        <TrajectoryMap trajectoryData={trajectory} styles={mapStyles} />

        <h2 className="font-semibold text-lg">Robot :</h2>

        <RobotCard id={configurationData.robot_id} />

        <h2 className="font-semibold text-lg">Équipement :</h2>

        <EquipmentCard id={configurationData.equipment_id} />
      </CardContent>
      <CardFooter>
        <p>* Heure de fin fournie à titre indicatif.</p>
      </CardFooter>
    </Card>
  );
};

export default TaskPage;
