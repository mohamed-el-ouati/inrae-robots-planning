"use client";

import {
  FormControl,
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
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";

type SelectFormStepProps = {
  form: any;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ActivityStep = ({ form }: SelectFormStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Fetching categories and activities data
  const { data: categories, error: categoriesError } = useSWR(
    `/api/activity-categories`,
    fetcher
  );
  const { data: activities, error: activitiesError } = useSWR(
    selectedCategory ? `/api/activities/category/${selectedCategory}` : null,
    fetcher
  );

  if (categoriesError || activitiesError) return <div>Error loading data</div>;
  if (!categories) return <div>Loading categories...</div>;

  return (
    <div className="max-w-[400px] w-full flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Activity</h2>

      <FormItem>
        <FormControl>
          <Select
            onValueChange={handleChange}
            defaultValue={selectedCategory}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0
                ? categories.map((option: any) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))
                : "No data available"}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>

      {selectedCategory && (
        <>
          {!activities && <div>Loading activities...</div>}
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {activities && activities.length > 0
                        ? activities.map((option: any) => (
                            <SelectItem
                              key={option.id}
                              value={`${option.name}_${option.id}`}
                            >
                              {option.name}
                            </SelectItem>
                          ))
                        : "No data available"}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default ActivityStep;
