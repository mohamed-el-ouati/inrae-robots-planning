"use client";

import RobotForm from "../../RobotForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils/utils";
import { robotSchema } from "@/lib/validations/robot";
import { z } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
type UpdateRobotPageProps = {
  params: {
    id: string;
  };
};

async function getRobotById(id: string) {
  const res = await fetch(`${baseUrl}/robots/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const updateRobotPage = async ({ params }: UpdateRobotPageProps) => {
  const robot = await getRobotById(params.id);

  const defaultValues = {
    name: robot.name,
    description: robot.description,
    puissance_kwh: robot.puissance_kwh || 0,
    recharge_time: robot.recharge_time
      ? formatDuration(robot.recharge_time)
      : null,
    operating_time: robot.operating_time
      ? formatDuration(robot.operating_time)
      : null,
    weight: robot.weight || 0,
    frontaxle_steeringspeed: robot.frontaxle_steeringspeed || 0,
    maxangle_steering: robot.maxangle_steering || 0,
    rearaxle_steeringspeed: robot.rearaxle_steeringspeed,
    id_powercat: robot.id_powercat.toString(),
    availableTill: robot.availableTill || "",
    steering_wheel: robot.steering_wheel || 0,
    driving_wheel: robot.driving_wheel || 0,
    dim_length: robot.dim_length || 0,
    dim_width: robot.dim_width || 0,
    dim_height: robot.dim_height || 0,
  };

  async function onSubmit(values: z.infer<typeof robotSchema>) {
    try {
      const response = await fetch(`${baseUrl}/robots/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update robot");
      }

      alert("Robot updated successfully");
    } catch (error) {
      alert("Failed to update robot");
      console.error("Error updating robot:", error);
    }
  }

  return (
    <Card className="min-w-[35%]">
      <CardHeader>
        <CardTitle className="text-3xl">Update Robot</CardTitle>
      </CardHeader>
      <CardContent>
        <RobotForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default updateRobotPage;
