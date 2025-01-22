"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import uploadTrajectory from "./uploadTrajectory";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TrajectoryForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    robot: "",
    activity: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetching activities
  const {
    data: activities,
    error: activitiesError,
    isLoading: activitiesIsLoading,
  } = useSWR(`/api/activities`, fetcher);

  // Fetching robots
  const {
    data: robots,
    error: robotsError,
    isLoading: robotsIsLoading,
  } = useSWR(`/api/robots/id-and-name`, fetcher);

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
    if (!formData.robot) {
      newErrors.robot = "Robot is required";
    }
    if (!formData.activity) {
      newErrors.activity = "Activity is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("file", formData.file);
      formDataObj.append("robotId", formData.robot);
      formDataObj.append("activityId", formData.activity);

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
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <form className="max-w-md w-full flex flex-col gap-4" onSubmit={onSubmit}>
        {/* Input fields */}
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
          <p className="font-medium">Robot</p>
          {robotsIsLoading ? (
            <p>Loading robots...</p>
          ) : robotsError ? (
            <p>Error loading robots</p>
          ) : (
            <Select
              name="robot"
              value={formData.robot}
              onValueChange={(value) =>
                handleSelectChange({ target: { name: "robot", value } })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Robot for this trajectory" />
              </SelectTrigger>
              <SelectContent>
                {robots && robots.length > 0
                  ? robots.map((option) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    ))
                  : "No data available"}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-medium">Activity</p>
          {activitiesIsLoading ? (
            <p>Loading activities...</p>
          ) : activitiesError ? (
            <p>Error loading activities</p>
          ) : (
            <Select
              name="activity"
              value={formData.activity}
              onValueChange={(value) =>
                handleSelectChange({ target: { name: "activity", value } })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Activity for this trajectory" />
              </SelectTrigger>
              <SelectContent>
                {activities && activities.length > 0
                  ? activities.map((option) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    ))
                  : "No data available"}
              </SelectContent>
            </Select>
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

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default TrajectoryForm;
