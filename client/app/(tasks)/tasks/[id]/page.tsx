import DetailsCard from "@/components/DetailsCard";
import {
  convertOjectToKeyValueArray,
  formatDateString,
} from "@/lib/utils/utils";

type TaskPageProps = {
  params: {
    id: string;
  };
};

async function getTaskById(id: string) {
  const res = await fetch(`http://localhost:3001/tasks/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

const TaskPage: React.FC<TaskPageProps> = async ({ params }) => {
  const task = transformDataToTask(await getTaskById(params.id));

  return (
    <DetailsCard
      title={"Task Details"}
      data={convertOjectToKeyValueArray(task)}
      image={null}
      editBtnLink={`/`}
      deleteUrl={`http://localhost:3001/configurations-ref/${params.id}`}
    />
  );
};

export default TaskPage;
