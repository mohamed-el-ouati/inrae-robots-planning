import SelectTrajectoryMap from "@/components/SelectTrajectoryMap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
type TrajectoryStepProps = {
  form: any;
  url: string;
};

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const TrajectoryStep = () => {
  // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // const { data, error, isLoading } = useSWR(url, fetcher);
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading data</div>;

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold">Trajectories</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        Select one or more trajectories from the list.
      </p>
      {/* <div className="flex gap-8 pt-4">
        <FormField
          control={form.control}
          name="trajectory"
          render={() => (
            <FormItem>
              {data.map((item: any) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="trajectory"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        /> */}
      <SelectTrajectoryMap />
      {/* </div> */}
    </div>
  );
};

export default TrajectoryStep;
