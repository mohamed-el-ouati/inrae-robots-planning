import React from "react";
import TrajectoryForm from "./TrajectoryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const addTrajectoryPage = () => {
  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Add a new Trajectory</CardTitle>
      </CardHeader>
      <CardContent>
        <TrajectoryForm />
      </CardContent>
    </Card>
  );
};

export default addTrajectoryPage;
