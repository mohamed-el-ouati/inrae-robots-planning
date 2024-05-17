"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
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
import MapBox from "@/components/MapBox";
type SelectFormStepProps = {
  form: any;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const PlotFormStep = ({ form }: SelectFormStepProps) => {
  const { data, error, isLoading } = useSWR(`${baseUrl}/plots/`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <h2 className="text-2xl font-semibold">Plot</h2>
      <div className="z-50">
        <FormField
          control={form.control}
          name={"plot"}
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select Plot`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.length > 0
                    ? data.map((option: any) => (
                        <SelectItem
                          key={option.id}
                          value={option.name + "_" + option.id.toString()}
                        >
                          {option.name}
                        </SelectItem>
                      ))
                    : "No data available"}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <MapBox />
    </>
  );
};

export default PlotFormStep;
