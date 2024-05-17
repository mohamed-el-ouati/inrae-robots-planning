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
import { formatAndCapitalize } from "@/lib/utils/utils";

type Option = {
  id: number;
  name: string;
};

type SelectFieldProps = {
  options: Option[];
  name: string;
  form: any;
  label?: string;
  placeholder?: string;
};

const SelectField = ({
  form,
  name,
  options,
  label,
  placeholder,
}: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            required
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    placeholder || `Select ${formatAndCapitalize(name)}`
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0
                ? options.map((option: any) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                      {option.class}
                    </SelectItem>
                  ))
                : "No data available"}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
