"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import uploadTrajectory from "./uploadTrajectory";
import { useRouter } from "next/navigation";

function TrajectoryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.file) {
      newErrors.file = "File is required";
    } else if (!formData.file.name.endsWith(".traj")) {
      newErrors.file = "Please upload a .traj file";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("file", formData.file);
      try {
        const result = await uploadTrajectory(formDataObj);
        if (result.success) {
          toast({
            title: "Success!",
            description: "Trajectory added successfully!",
          });
          router.push("/trajectories/");
        }
      } catch (error) {
        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
        });
      }
    }
  };

  return (
    <div>
      <form className="max-w-md w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Name</p>
          <Input
            name="name"
            placeholder="Trajectory Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Upload Trajectory File</p>
          <Input
            type="file"
            name="file"
            className="hover:cursor-pointer"
            onChange={handleFileChange}
          />
          {errors.file && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors.file}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Please upload a .traj file.
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default TrajectoryForm;
