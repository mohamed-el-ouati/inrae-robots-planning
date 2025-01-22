import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import InputSkeleton from "@/components/InputSkeleton";

type RobotFieldProps = {
  form: any;
};

const RobotField = ({ form }: RobotFieldProps) => {
  const { data: robots, isLoading, error } = useSWR(`/api/robots`, fetcher);

  if (isLoading) return <InputSkeleton />;
  if (error) return <div>Error loading data</div>;

  return (
    <FormField
      control={form.control}
      name="robot"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange({ target: { value } })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Robot" />
              </SelectTrigger>
              <SelectContent>
                {robots?.length ? (
                  robots.map((option: any) => (
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

export default RobotField;
