"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAndCapitalize } from "@/lib/utils/utils";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type ListItem = {
  key: string;
  value: any;
};

type DetailsCardProps = {
  data: ListItem[];
  editBtnLink: string;
  deleteUrl: string;
  image: any;
  title?: string;
  redirectionUrlAfterDelete: string;
};

const DetailsCard = ({
  data,
  image,
  editBtnLink,
  deleteUrl,
  title,
  redirectionUrlAfterDelete,
}: DetailsCardProps) => {
  const router = useRouter();

  const deleteTask = (url: string, redirectionUrlAfterDelete: string) => {
    if (confirm(`Are you sure you want to delete this item?`)) {
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the item");
          }
          // Redirect after successful deletion
          router.push(redirectionUrlAfterDelete);
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error deleting task:", error);
        });
    }
  };

  const formatValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return value;
  };

  // Filter out items with null or undefined values
  const filteredData = data.filter((item) => item.value != null);

  return (
    <Card className="w-full lg:w-3/4 xl:w-3/6">
      <CardHeader className="flex flex-row flex-wrap justify-between items-center">
        <CardTitle className="text-3xl">
          {title || filteredData[1]?.value}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={editBtnLink}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteTask(deleteUrl, redirectionUrlAfterDelete)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex items-center flex-col flex-wrap gap-8">
        {image && (
          <Image
            src={image}
            alt="Item Image"
            width={500}
            height={500}
            className="w-full aspect-square rounded-md object-cover"
          />
        )}

        <ul className="flex w-full flex-col gap-4">
          {filteredData.map((item, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="font-medium leading-none">
                  {formatAndCapitalize(item.key)} :
                </p>
                <p className="text-muted-foreground">
                  {formatValue(item.value)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
