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
import InputSkeleton from "@/components/InputSkeleton";

type PlotFieldProps = {
  form: any;
};

const PlotField = ({ form }: PlotFieldProps) => {
  const { data: plots, isLoading, error } = useSWR(`/api/plots`, fetcher);

  if (isLoading) return <InputSkeleton />;
  if (error) return <div>Error loading data</div>;

  return (
    <FormField
      control={form.control}
      name="plot"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange({ target: { value } })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plot" />
              </SelectTrigger>
              <SelectContent>
                {plots?.length ? (
                  plots.map((option: any) => (
                    <SelectItem key={option.name} value={option.id.toString()}>
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

export default PlotField;
