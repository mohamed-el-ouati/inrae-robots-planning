import { Button } from "@/components/ui/button";
import Link from "next/link";
import EquipmentsTable from "./EquipmentsTable";

const equipmentsPage = () => {
  return (
    <div className="w-full">
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Equipments</h1>
        <Button asChild>
          <Link href="/add-equipment">Add a new Equipment</Link>
        </Button>
      </div>
      <EquipmentsTable />
    </div>
  );
};

export default equipmentsPage;
