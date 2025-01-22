import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import placeholderImg from "../../../../../public/images/placeholder.png";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { convertImageDataToBase64, formatDuration } from "@/lib/utils/utils";

type EquipmentStepProps = {
  form: any;
  url: string;
};

const EquipmentStep = ({ form, url }: EquipmentStepProps) => {
  const { data: equipments, error, isLoading } = useSWR(url, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <div className="max-w-[400px] w-full flex flex-col gap-4">
      <FormField
        control={form.control}
        name="equipment"
        render={({ field }) => (
          <FormItem className="space-y-3 w-full">
            <FormLabel className="text-2xl font-semibold">Equipment</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <ScrollArea className="w-full h-[280px]">
                  {equipments.length == 0 && "No Equipments available!"}
                  {equipments.map((equipment: any, index: any) => (
                    <FormItem key={index}>
                      <FormControl>
                        <ToggleGroupItem
                          value={equipment.name + "_" + equipment.id.toString()}
                          className="h-fit w-full py-2 px-4 mb-2 rounded-md border"
                        >
                          <div className="w-full flex items-center gap-2">
                            <Image
                              src={
                                equipment.image
                                  ? convertImageDataToBase64(
                                      equipment.image.data
                                    )
                                  : placeholderImg
                              }
                              alt="Equipment"
                              width={84}
                              height={84}
                              className="aspect-square rounded-md object-cover"
                            />
                            <div className="w-full flex flex-col text-left">
                              <p>
                                <span className="text-muted-foreground">
                                  Name :
                                </span>
                                {" " + equipment.name}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Working Width :
                                </span>
                                {" " + equipment.working_width_m + " m"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Required Power :
                                </span>
                                {equipment.required_power_kw !== null
                                  ? " " + equipment.required_power_kw + " kWh"
                                  : " -"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Operating time :
                                </span>
                                {equipment.weight_kg
                                  ? " " + equipment.weight_kg + " kg"
                                  : " -"}
                              </p>
                            </div>
                          </div>
                        </ToggleGroupItem>
                      </FormControl>
                    </FormItem>
                  ))}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EquipmentStep;
