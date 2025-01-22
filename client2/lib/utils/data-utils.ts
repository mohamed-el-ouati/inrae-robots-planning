import { Robot, RobotEssentials } from "../types";
import { convertImageDataToBase64, formatDuration } from "./utils";

export const transformRobotData = (data: any): Robot => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    puissance_kwh: data.puissance_kwh,
    recharge_time: data.recharge_time ? formatDuration(data.recharge_time) : "",
    operating_time: data.operating_time
      ? formatDuration(data.operating_time)
      : "",
    image_data: data.image_data
      ? convertImageDataToBase64(data.image_data.data)
      : "",
    weight: data.weight,
    front_axle_steering_speed: data.frontaxle_steeringspeed,
    max_angle_steering: data.maxangle_steering,
    rear_axle_steering_speed: data.rearaxle_steeringspeed,
    id_powercat: data.id_powercat,
    available_till: data.availableTill,
    steering_wheel: data.steering_wheel,
    driving_wheel: data.driving_wheel,
    dim_length: data.dim_length,
    dim_width: data.dim_width,
    dim_height: data.dim_height,
  };
};

export const transformRobotEssentialsData = (data: any): any => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    puissance_kwh: data.puissance_kwh,
    recharge_time: data.recharge_time ? formatDuration(data.recharge_time) : "",
    operating_time: data.operating_time
      ? formatDuration(data.operating_time)
      : "",
    image_data: data.image_data
      ? convertImageDataToBase64(data.image_data.data)
      : "",
  };
};
