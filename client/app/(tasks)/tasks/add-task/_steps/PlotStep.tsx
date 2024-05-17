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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MapBox from "@/components/MapBox";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const PlotStep = () => {
  const { data, error, isLoading } = useSWR(`${baseUrl}/plots/names`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-medium">Plot</h2>

      <div className="z-50">
        <Select
          // onValueChange={field.onChange}
          // defaultValue={field.value}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder={`Select Plot`} />
          </SelectTrigger>
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
      </div>
      <MapBox />
    </div>
  );
};

export default PlotStep;
