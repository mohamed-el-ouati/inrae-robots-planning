"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import uploadImage from "./uploadImage";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  { name: "file", label: "Upload Image", type: "file" },
];

function EquipmentForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState(
    fieldConfigs.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "file" ? null : "",
      }),
      {}
    )
  );
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   fieldConfigs.forEach(({ name, type }) => {
  //     if (type !== "file" && !formData[name]?.trim()) {
  //       newErrors[name] = `${name} is required`;
  //     }
  //     if (type === "file" && !formData[name]) {
  //       newErrors[name] = "Image is required";
  //     }
  //   });

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // if (validateForm()) {
    const formDataObj = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataObj.append(key, value);
    }

    try {
      const result = await uploadImage(formDataObj);
      if (result.success) {
        toast({
          title: "Success!",
          description: "Equipment inserted successfully!",
        });
        router.push("/equipments/");
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "An error occurred.",
        status: "error",
      });
    }
  };

  return (
    <div>
      <form className="max-w-md w-full flex flex-col gap-4" onSubmit={onSubmit}>
        {fieldConfigs.map((field) => {
          const { name, label, type, options } = field;

          return (
            <div key={name} className="flex flex-col gap-1">
              <p className="font-medium">{label}</p>
              {type === "select" ? (
                <div key={name} className="flex flex-col gap-1">
                  <Select
                    name={name}
                    value={formData[name] || ""} // Set default value to empty string
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
                  {errors[name] && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors[name]}
                    </p>
                  )}
                </div>
              ) : type === "radio" ? (
                options &&
                options.map((option) => (
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
              ) : type === "file" ? (
                <Input
                  type="file"
                  name={name}
                  className="hover:cursor-pointer"
                  onChange={handleFileChange}
                />
              ) : (
                <Input
                  type={type}
                  name={name}
                  placeholder={label}
                  value={formData[name]}
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

export default EquipmentForm;
