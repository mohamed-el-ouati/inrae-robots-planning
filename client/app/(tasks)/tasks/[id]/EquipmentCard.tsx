import { fetcher } from "@/lib/fetcher";
import { formatDuration } from "@/lib/utils/utils";
import Image from "next/image";
import useSWR from "swr";
import placeholderImg from "../../../../public/images/placeholder.png";
import Link from "next/link";

type EquipmentCardProps = {
  id: string;
};

const EquipmentCard = ({ id }: EquipmentCardProps) => {
  const {
    data: equipment,
    error,
    isLoading,
  } = useSWR(`/api/equipments/${id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <div className="w-full flex items-center gap-2">
      <Image
        src={
          equipment.image
            ? `data:image/jpeg;base64,${btoa(
                equipment.image.data
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
          <span className="text-muted-foreground">Name : </span>
          {" " + equipment.name}
        </p>

        <p>
          <span className="text-muted-foreground">Weight : </span>
          {equipment.puissance_kwh !== null
            ? " " + equipment.weight_kg + " kg"
            : " -"}
        </p>
        <p>
          <span className="text-muted-foreground">Required Power : </span>
          {equipment.required_power_kw + " kw"}
        </p>
        <p>
          <span className="text-muted-foreground">Number Of Teeth : </span>
          {equipment.number_of_teeth}
        </p>
        <p>
          <span className="text-muted-foreground">Tooth Width : </span>
          {equipment.tooth_width_cm}
        </p>
        <Link
          href={`/equipments/${equipment.id}`}
          className="underline text-blue-800"
        >
          More details
        </Link>
      </div>
    </div>
  );
};

export default EquipmentCard;
