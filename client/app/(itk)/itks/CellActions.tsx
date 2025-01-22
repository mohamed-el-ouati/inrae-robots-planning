import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const CellActions = ({ itk }: { itk: any }) => {
  const router = useRouter();
  const { toast } = useToast();

  const ViewItk = (id: number) => {
    router.push("/itks/" + id);
  };

  const deleteItk = async (ItkId: number) => {
    if (confirm(`Are you sure to delete this ITK?`)) {
      try {
        // Step 1: Delete ITK tasks
        await fetch(`/api/configurations/itk/${ItkId}`, {
          method: "DELETE",
        });

        // Step 2: Delete the ITK
        await fetch(`/api/itks/${ItkId}`, {
          method: "DELETE",
        });

        toast({
          title: "Success",
          description: "ITK and its related tasks have been deleted.",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete ITK and its related tasks.",
        });
        console.error("Failed to delete ITK:", error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => ViewItk(itk.id)}>
          View ITK details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteItk(itk.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
