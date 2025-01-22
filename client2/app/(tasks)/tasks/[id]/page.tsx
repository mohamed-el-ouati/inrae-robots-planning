"use client";

import DetailsCard from "@/components/DetailsCard";
import {
  convertOjectToKeyValueArray,
  formatDateString,
} from "@/lib/utils/utils";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type TaskPageProps = {
  params: {
    id: string;
  };
};

const transformDataToTask = (data: any): any => {
  return {
    id: data.configuration_ref_id,
    activity: data.activity_name || "-",
    plot: data.plot_name || "-",
    trajectory: data.trajectory_name || "-",
    robot: data.robot_name || "-",
    equipment: data.equipment_name || "-",
    start_date: formatDateString(data.start_date),
    end_date: formatDateString(data.end_date),
  };
};

const TaskPage: React.FC<TaskPageProps> = ({ params }) => {
  const url = `/api/tasks/${params.id}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data!</div>;

  const task = transformDataToTask(data);

  return (
    <DetailsCard
      title={"Task Details"}
      data={convertOjectToKeyValueArray(task)}
      image={null}
      editBtnLink={`/`}
      deleteUrl={`/api/configurations-ref/${params.id}`}
    />
  );
};

export default TaskPage;
