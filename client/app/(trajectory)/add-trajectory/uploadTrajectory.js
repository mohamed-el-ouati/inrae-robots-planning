"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function upload(data) {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  if (!file || file.name.split(".").pop() !== "traj") {
    throw new Error("Please upload a .traj file");
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

  // Insert data into trajectory_ref table
  const trajectoryRefResponse = await fetch(
    `${baseUrl}/trajectories/insert-name`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }
  );

  if (!trajectoryRefResponse.ok) {
    console.error("Failed to insert trajectory ref!");
    return;
  }

  const trajectoryRefData = await trajectoryRefResponse.json();
  const id = trajectoryRefData.trajectory.id;

  try {
    const response = await fetch(`${baseUrl}/trajectories/insert-points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, filePath }), // sending filePath to the server
    });

    if (!response.ok) {
      throw new Error("Failed to submit form. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  return { success: true };
}
