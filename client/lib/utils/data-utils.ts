import { Robot, RobotEssentials } from "../types";
import { convertImageDataToBase64, formatDuration } from "./utils";

export const transformRobotData = (data: any): Robot => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    locomotion: data.locomotion, // New property
    weight_kg: data.weight_kg, // New property (unit is kg)
    length_mm: data.length_mm, // New property (unit is mm)
    width_mm: data.width_mm, // New property (unit is mm)
    height_mm: data.height_mm, // New property (unit is mm)
    max_speed_mps: data.max_speed_mps, // New property (unit is m/s)
    autonomy: data.autonomy,
    manipulation: data.manipulation, // New property
    on_board_sensors: data.on_board_sensors, // New property
    image: data.image ? convertImageDataToBase64(data.image.data) : "",
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
