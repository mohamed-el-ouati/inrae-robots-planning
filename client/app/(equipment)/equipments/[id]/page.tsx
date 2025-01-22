import {
  convertImageDataToBase64,
  formatAndCapitalize,
} from "../../../../lib/utils/utils";
import DetailsCard from "@/components/DetailsCard";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type RobotPageProps = {
  params: {
    id: string;
  };
};

async function getEquipmentById(id: string) {
  const res = await fetch(`${baseUrl}/equipments/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}

const page = async ({ params }: RobotPageProps) => {
  const equipment = await getEquipmentById(params.id);

  const equipmentDetails = Object.entries(equipment).reduce(
    (acc: { key: string; value: any }[], [key, value]) => {
      if (key !== "image") {
        const formattedKey = formatAndCapitalize(key);
        acc.push({ key: formattedKey, value });
      }
      return acc;
    },
    []
  );

  return (
    <DetailsCard
      data={equipmentDetails}
      image={
        equipment.image !== null
          ? convertImageDataToBase64(equipment.image.data)
          : null
      }
      editBtnLink={`/update-equipment/${params.id}`}
      deleteUrl={`${baseUrl}/equipments/${params.id}`}
      redirectionUrlAfterDelete={"/equipments"}
    />
  );
};

export default page;
