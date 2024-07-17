"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { robotSchema } from "@/lib/validations/robot";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import RobotForm from "../RobotForm";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddRobot = () => {
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof robotSchema>) {
    // Cast id_powercat to integer (because select returns a string value)
    const { id_powercat, ...rest } = values;
    const parsedValues = {
      ...rest,
      id_powercat: parseInt(id_powercat),
    };

    try {
      const response = await fetch(`/api/robots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedValues),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again.");
      }
      toast({
        title: "Robot added successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  }

  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Add a new Robot</CardTitle>
      </CardHeader>
      <CardContent>
        <RobotForm onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};

export default AddRobot;
