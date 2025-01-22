import InputSkeleton from "@/components/InputSkeleton";
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
import React, { useState } from "react";
import useSWR from "swr";

type ActivityFieldProps = {
  form: any;
};

const ActivityField = ({ form }: ActivityFieldProps) => {
  // Fetching activities
  const {
    data: activities,
    error: activitiesError,
    isLoading: activitiesisLoading,
  } = useSWR(`/api/activities`, fetcher);

  if (activitiesisLoading) return <InputSkeleton />;
  if (activitiesError) return <div>Error loading data</div>;

  return (
    <FormField
      control={form.control}
      name="activity"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange({ target: { value } })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Activity" />
              </SelectTrigger>
              <SelectContent>
                {activities?.length ? (
                  activities.map((option: any) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">No data available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ActivityField;
