"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateTrajectoryForm from "./UpdateTrajectoryForm";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
type updateTrajectoryPageProps = {
  params: {
    id: string;
  };
};

const updateTrajectoryPage = ({ params }: updateTrajectoryPageProps) => {
  const url = `/api/trajectories/${params.id}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des données</div>;

  const trajName = data[0].traj_name;
  const activity = data[0].activity_id.toString();
  const robot = data[0].robot_id.toString();

  const defaultValues = {
    name: trajName,
    activity: activity,
    robot: robot,
  };
   return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Mise à jour de la trajectoire</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateTrajectoryForm params={params} defaultValues={defaultValues} />
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          <span className="font-semibold">Remarque:</span> Pour modifier les points de trajectoire
ou le tracé associé, veuillez supprimer la trajectoire actuelle
et télécharger le fichier de trajectoire mis à jour.

        </p>
      </CardFooter>
    </Card>
  );
};

export default updateTrajectoryPage;
