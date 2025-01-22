export type Robot = {
  id: number;
  name: string;
  description: string;
  locomotion: string;
  weight_kg: number;
  length_mm: number;
  width_mm: number;
  height_mm: number;
  max_speed_mps: number;
  autonomy: string;
  manipulation: string;
  on_board_sensors: strin;
  image: string;
};

export type RobotEssentials = {
  id: number;
  name: string;
  max_speed_mps: number;
  weight_kg: number;
  image: string;
};

export type Trajectory = {
  id: number;
  traj_name: string;
  plot_name: string;
};

export type Plot = {
  id: number;
  name: string;
};

export type Equipment = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type Task = {
  id: number;
  start_date: Date;
  end_date: Date;
  activity_id: string;
  activity_name: string;
  robot_id: string;
  robot_name: string;
  equipment_id: string;
  equipment_name: string;
  plot_id: string;
  plot_name: string;
  trajectory_name: string;
  trajectory_id: string;
  itk_id: number;
};

export type Activity = {
  id: number;
  name: string;
  category: string;
};
