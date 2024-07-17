"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function upload(data) {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const filePath = join(
    "/",
    "Users/ayhatmi/Desktop/crud-nodejs-postgresql-nextjs/files/",
    file.name
  );
  await writeFile(filePath, buffer);

  const name = data.get("name");
  const description = data.get("description");

  console.log(name + description + filePath);
  const trajectoryRefResponse = await fetch(`/api/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      imagePath: filePath,
    }),
  });

  if (!trajectoryRefResponse.ok) {
    console.error("Failed to insert equipment!");
    return;
  }

  return { success: true };
}
