import {
  convertImageDataToBase64,
  formatAndCapitalize,
} from "../../../../lib/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
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

  // const deleteEquipment = async () => {
  //   if (confirm(`Are you sure to delete this equipment?`)) {
  //     try {
  //       const response = await fetch(`${baseUrl}/equipments/${params.id}`, {
  //         method: "DELETE",
  //       });
  //       router.push("/");
  //       if (!response.ok) throw new Error("Failed to delete the Equipment");
  //     } catch (error) {
  //       alert("There was an error!");
  //     }
  //   }
  // };
  return (
    // <Card className={"w-full lg:w-3/4 xl:w-3/6 "}>
    //   <CardHeader className="flex flex-row flex-wrap justify-between items-center">
    //     <CardTitle className="text-3xl">Equipment Details</CardTitle>
    //     <div className="flex gap-2">
    //       {/* <Button variant="outline" asChild>
    //         <Link href={editBtnLink}>
    //           <Pencil className="mr-2 h-4 w-4" /> Edit
    //         </Link>
    //       </Button> */}
    //       <Button variant="outline" onClick={() => deleteEquipment()}>
    //         <Trash2 className="mr-2 h-4 w-4" /> Delete
    //       </Button>
    //     </div>
    //   </CardHeader>
    //   <CardContent className={"flex items-center flex-col flex-wrap gap-8"}>
    //     <Image
    //       src={convertImageDataToBase64(equipment.image.data)}
    //       alt="Robot"
    //       width={500}
    //       height={500}
    //       className="w-full aspect-square rounded-md object-cover"
    //     />
    //     <ul className="flex w-full flex-col gap-4">
    //       <li className="flex justify-between">
    //         <p className="font-medium leading-none">Id : </p>
    //         <p className="text-muted-foreground">{equipment.id}</p>
    //       </li>
    //       <li className="flex justify-between">
    //         <p className="font-medium leading-none">Name : </p>
    //         <p className="text-muted-foreground">{equipment.name}</p>
    //       </li>
    //       <li className="flex justify-between">
    //         <p className="font-medium leading-none">Description : </p>
    //         <p className="text-muted-foreground">{equipment.description}</p>
    //       </li>
    //     </ul>

    //   </CardContent>
    // </Card>
    <DetailsCard
      title="Equipment Details"
      data={equipmentDetails}
      // hasAnImage={equipment.image !== ""}
      image={
        equipment.image !== null
          ? convertImageDataToBase64(equipment.image.data)
          : null
      }
      editBtnLink={`/update-equipment/${params.id}`}
      deleteUrl={`http://localhost:3001/equipments/${params.id}`}
    />
  );
};

export default page;
