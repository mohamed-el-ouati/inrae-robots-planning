import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { fetcher } from "@/lib/fetcher";
import { formatDuration } from "@/lib/utils/utils";
import Image from "next/image";
import useSWR from "swr";
import placeholderImg from "../../../../../public/images/placeholder.png";
type RobotStepProps = {
  form: any;
  url: string;
};

const RobotStep = ({ form, url }: RobotStepProps) => {
  const { data: robots, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <div className="max-w-[400px] w-full flex flex-col gap-4">
      <FormField
        control={form.control}
        name="robot"
        render={({ field }) => (
          <FormItem className="space-y-3 w-full">
            <FormLabel className="text-2xl font-semibold">Robot</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <ScrollArea className="w-full h-[280px]">
                  {robots.length == 0 && "No Robots available!"}
                  {robots.map((robot: any, index: any) => (
                    <FormItem key={index}>
                      <FormControl>
                        <ToggleGroupItem
                          value={robot.name + "_" + robot.id.toString()}
                          className="h-fit w-full py-2 px-4 mb-2 rounded-md border"
                        >
                          <div className="w-full flex items-center gap-2">
                            <Image
                              src={
                                robot.image
                                  ? `data:image/jpeg;base64,${btoa(
                                      robot.image.data
                                        .map((byte: any) =>
                                          String.fromCharCode(byte)
                                        )
                                        .join("")
                                    )}`
                                  : placeholderImg
                              }
                              alt="Robot"
                              width={84}
                              height={84}
                              className="aspect-square rounded-md object-cover"
                            />
                            <div className="w-full flex flex-col text-left">
                              <p>
                                <span className="text-muted-foreground">
                                  Name :
                                </span>
                                {" " + robot.name}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Description :
                                </span>
                                {" " + robot.description}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Power :
                                </span>
                                {robot.puissance_kwh !== null
                                  ? " " + robot.puissance_kwh + " kWh"
                                  : " -"}
                              </p>
                              <p>
                                <span className="text-muted-foreground">
                                  Operating time :
                                </span>
                                {robot.operating_time
                                  ? " " + formatDuration(robot.operating_time)
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

export default RobotStep;
