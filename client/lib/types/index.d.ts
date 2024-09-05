export type Robot = {
  id: number;
  name: string;
  description: string;
  puissance_kwh: number;
  recharge_time: string;
  operating_time: string;
  image_data: string;
  weight: number;
  front_axle_steering_speed: number;
  max_angle_steering: number;
  rear_axle_steering_speed: number;
  id_powercat: number;
  available_till: string;
  steering_wheel: number;
  driving_wheel: number;
  dim_length: number;
  dim_width: number;
  dim_height: number;
};

export type RobotEssentials = {
  id: number;
  name: string;
  description: string;
  puissance_kwh: number;
  recharge_time: string;
  operating_time: string;
  image_data: string;
};

export type Alerts = {
  source: string;
  description: string;
  variables: string;
  time: string;
};


export type Requests = {
  id: number;
  priority: number;
  starttime: string;
  plot_id: number;
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
