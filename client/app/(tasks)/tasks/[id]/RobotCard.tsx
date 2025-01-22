import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import useSWR from "swr";
import placeholderImg from "../../../../public/images/placeholder.png";
import Link from "next/link";

type RobotCardProps = {
  id: string;
};

const RobotCard = ({ id }: RobotCardProps) => {
  const {
    data: robot,
    error,
    isLoading,
  } = useSWR(`/api/robots/${id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="w-full flex items-center gap-2">
      <Image
        src={
          robot.image
            ? `data:image/jpeg;base64,${btoa(
                robot.image.data
                  .map((byte: any) => String.fromCharCode(byte))
                  .join("")
              )}`
            : placeholderImg
        }
        alt="Robot"
        width={140}
        height={140}
        className="aspect-square rounded-md object-cover"
      />
      <div className="w-full flex flex-col text-left">
        <p>
          <span className="text-muted-foreground">Name :</span>
          {" " + robot.name}
        </p>
        <p>
          <span className="text-muted-foreground">Description :</span>
          {" " + robot.description}
        </p>

        <p>
          <span className="text-muted-foreground">On board Sensors :</span>
          {robot.on_board_sensors ? " " + robot.on_board_sensors : " -"}
        </p>
        <p>
          <span className="text-muted-foreground">Weight :</span>
          {robot.weight_kg !== null ? " " + robot.weight_kg + " kg" : " -"}
        </p>
        <p>
          <span className="text-muted-foreground">Locomotion :</span>
          {robot.locomotion !== null ? " " + robot.locomotion + " kg" : " -"}
        </p>
        <Link href={`/robots/${robot.id}`} className="underline text-blue-800">
          More details
        </Link>
      </div>
    </div>
  );
};

export default RobotCard;
