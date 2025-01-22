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
  { name: "description", label: "Description", type: "text" },
  { name: "locomotion", label: "Locomotion", type: "text" },
  { name: "weight_kg", label: "Weight (kg)", type: "number" },
  { name: "length_mm", label: "Length (mm)", type: "number" },
  { name: "width_mm", label: "Width (mm)", type: "number" },
  { name: "height_mm", label: "Height (mm)", type: "number" },
  { name: "max_speed_mps", label: "Max Speed (m/s)", type: "number" },
  { name: "autonomy", label: "Autonomy", type: "number" },
  { name: "manipulation", label: "Manipulation", type: "text" },
  { name: "on_board_sensors", label: "On Board Sensors", type: "text" },
];

function UpdateRobotForm({ defaultValues, robotId }) {
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

  const validateForm = () => {
    const newErrors = {};
    // Example validation: check if required fields are empty
    fieldConfigs.forEach((field) => {
      if (!formData[field.name] && field.type !== "select") {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return; // Exit if validation fails
    }

    try {
      const response = await fetch(`/api/robots/${robotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ description: "Robot updated successfully!" });
        router.push("/robots"); // Navigate to another page, e.g., robots list
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
    <div>
      <form className="max-w-md w-full flex flex-col gap-4 "  onSubmit={onSubmit}>
        {fieldConfigs.map((field) => {
          const { name, label, type, options } = field;

          return (
            <div key={name} className="flex flex-col gap-1">
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
    </div>
  );
}

export default UpdateRobotForm;
