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

type CategoryFieldProps = {
  form: any;
  handleCategoryChange: any;
};

const CategoryField = ({ form, handleCategoryChange }: CategoryFieldProps) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(`/api/activity-categories`, fetcher);

  if (isLoading) return <InputSkeleton />;
  if (error) return <div>Error loading data</div>;

  return (
    <FormField
      control={form.control}
      name="activity_category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Activity Category</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0
                  ? categories.map((option: any) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    ))
                  : "No data available"}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategoryField;
