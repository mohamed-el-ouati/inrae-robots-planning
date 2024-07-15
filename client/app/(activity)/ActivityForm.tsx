"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { activitySchema } from "@/lib/validations/activity";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ActivityForm = () => {
  const router = useRouter();
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/activity-categories`, fetcher);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof activitySchema>) {
    // Cast category_id to integer (because select returns a string value)
    const { category, ...rest } = values;
    const parsedValues = {
      ...rest,
      category_id: parseInt(category),
    };

    try {
      const response = await fetch(`${baseUrl}/activities`, {
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
        title: "Activity added successfully!",
      });
      router.push("/activities/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Activity name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories &&
                    categories.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
