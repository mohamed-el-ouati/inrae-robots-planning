import { Button } from "@/components/ui/button";
import Link from "next/link";
import RobotsTable from "./RobotsTable";

export default function RobotsPage() {
  return (
    <div className="w-full" key={Math.random()}>
      <div className="flex pb-4 justify-between gap-4">
        <h1 className="text-4xl font-semibold">Robots</h1>
        <Button asChild>
          <Link href="/add-robot">Add a new Robot</Link>
        </Button>
      </div>
      <RobotsTable />
    </div>
  );
}
