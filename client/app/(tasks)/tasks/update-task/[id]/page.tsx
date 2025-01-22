"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrajectoryStep from "../../add-task/_steps/TrajectoryStep";
import usePlotStore from "@/lib/store/PlotStore";
import UpdateTaskForm from "../_update-task-form/UpdateTaskForm";

type updateTrajectoryPageProps = {
  params: {
    id: string;
  };
};

const updateTrajectoryPage = ({ params }: updateTrajectoryPageProps) => {
  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Mise à jour de Tâche</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UpdateTaskForm params={params} />
      </CardContent>
    </Card>
  );
};

export default updateTrajectoryPage;
