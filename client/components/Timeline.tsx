import Link from "next/link";
import styles from "./Timeline.module.scss";

type TimelineProps = {
  tasks: any[];
};

const Timeline = ({ tasks }: TimelineProps) => {
  return (
    <nav className={styles.breadcrumb}>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Link href={`/tasks/${task.task_id}`} className={styles.link}>
              {task.activity_name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Timeline;
