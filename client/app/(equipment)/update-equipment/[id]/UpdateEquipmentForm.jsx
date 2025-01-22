"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fieldConfigs = [
  { name: "name", label: "Name", type: "text" },
  { name: "working_width_m", label: "Working Width (m)", type: "number" },
  {
    name: "trailed_or_carried",
    label: "Trailed or Carried",
    type: "select",
    options: [
      { id: "Trailed", name: "Trailed", label: "Trailed" },
      { id: "Carried", name: "Carried", label: "Carried" },
    ],
  },
  { name: "required_power_kw", label: "Required Power (kW)", type: "number" },
  { name: "number_of_teeth", label: "Number of Teeth", type: "number" },
  { name: "tooth_width_cm", label: "Tooth Width (cm)", type: "number" },
  { name: "capacity_l", label: "Capacity (L)", type: "number" },
  { name: "hitch", label: "Hitch", type: "text" },
  {
    name: "pneumatic",
    label: "Pneumatic",
    type: "radio",
    options: [
      { id: "true", label: "Yes" },
      { id: "false", label: "No" },
    ],
  },
  {
    name: "power_take_off",
    label: "Power Take-Off",
    type: "radio",
    options: [
      { id: "true", label: "Yes" },
      { id: "false", label: "No" },
    ],
  },
  {
    name: "hitch_ground_clearance",
    label: "Hitch Ground Clearance",
    type: "number",
  },
  { name: "weight_kg", label: "Weight (kg)", type: "number" },
];

function UpdateEquipmentForm({ defaultValues, equipmentId }) {
  const { toast } = useToast();
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormData = fieldConfigs.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: defaultValues[field.name] ?? "",
      }),
      {}
    );
    setFormData(initialFormData);
  }, [defaultValues]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`/api/equipments/${equipmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ description: "equipment updated successfully!" });
        router.push("/equipments"); // Navigate to another page, e.g., equipments list
      } else {
        const errorData = await response.json();
        toast({ description: `Error: ${errorData.message}` });
      }
    } catch (error) {
      toast({
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <form
      className="max-w-md w-full flex flex-col gap-4 bg-red-200 "
      onSubmit={onSubmit}
    >
      {fieldConfigs.map((field) => {
        const { name, label, type, options } = field;

        return (
          <div key={name} className="flex bg-red-200 flex-col gap-1">
            <p className="font-medium">{label}</p>
            {type === "select" ? (
              <Select
                name={name}
                value={formData[name] || ""}
                onValueChange={(value) =>
                  handleInputChange({ target: { name, value } })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options?.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : type === "radio" ? (
              options?.map((option) => (
                <label key={option.id} className="flex gap-2">
                  <input
                    type="radio"
                    name={name}
                    value={option.id}
                    checked={formData[name] === option.id}
                    onChange={handleInputChange}
                  />
                  <p>{option.label}</p>
                </label>
              ))
            ) : (
              <Input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
              />
            )}
            {errors[name] && (
              <p style={{ color: "red", fontSize: "14px" }}>{errors[name]}</p>
            )}
          </div>
        );
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default UpdateEquipmentForm;
