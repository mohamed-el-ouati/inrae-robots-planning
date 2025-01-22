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

type EquipmentFieldProps = {
  form: any;
};

const EquipmentField = ({ form }: EquipmentFieldProps) => {
  const {
    data: equipments,
    isLoading,
    error,
  } = useSWR(`/api/equipments`, fetcher);

  if (isLoading) return <InputSkeleton />;
  if (error) return <div>Error loading data</div>;

  return (
    <FormField
      control={form.control}
      name="equipment"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange({ target: { value } })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipments?.length ? (
                  equipments.map((option: any) => (
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

export default EquipmentField;
