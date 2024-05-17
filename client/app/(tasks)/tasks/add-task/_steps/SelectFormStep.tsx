"use client";
import { formatAndCapitalize } from "@/lib/utils/utils";
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
type SelectFormStepProps = {
  form: any;
  name: string;
  url: string;
};

const SelectFormStep = ({ form, name, url }: SelectFormStepProps) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <h2 className="text-2xl font-semibold">{formatAndCapitalize(name)}</h2>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              required
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${formatAndCapitalize(name)}`}
                  />
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
    </>
  );
};

export default SelectFormStep;
