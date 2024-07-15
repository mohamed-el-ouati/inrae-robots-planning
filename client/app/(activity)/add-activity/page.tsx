"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityForm from "../ActivityForm";

const AddActivity = () => {
  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-3xl">Add a new Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityForm />
      </CardContent>
    </Card>
  );
};

export default AddActivity;
