"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import ActivityField from "@/app/(tasks)/tasks/update-task/_update-task-form/ActivityField";
import RobotField from "@/app/(tasks)/tasks/update-task/_update-task-form/RobotField";

const formSchema = z.object({
  name: z.string(),
  activity: z.string(),
  robot: z.any(),
});

type UpdateTrajectoryFormProps = {
  params: {
    id: string;
  };
  defaultValues: any;
};

const UpdateTrajectoryForm = ({
  params,
  defaultValues,
}: UpdateTrajectoryFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/trajectories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          robot_id: parseInt(values.robot),
          activity_id: parseInt(values.activity),
        }),
      });

      if (response.ok) {
        toast({ description: "Trajectroy updated successfully!" });

        router.push(`/trajectories/${params.id}`);
      } else {
        toast({ description: `Error: ${response.statusText}` });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Trajectory name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel className="font-semibold">Activity</FormLabel>
        <ActivityField form={form} />
        <FormLabel className="font-semibold">Robot</FormLabel>
        <RobotField form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UpdateTrajectoryForm;
