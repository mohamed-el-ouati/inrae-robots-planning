"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function upload(data) {
  try {
    const file = data.get("file");
    if (!file) {
      throw new Error("No file uploaded");
    }

    if (file.name.split(".").pop() !== "traj") {
      throw new Error("Please upload a .traj file");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join("/usr/src/app/files/", file.name);
    await writeFile(filePath, buffer);
    console.log(`File written to ${filePath}`);

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
      throw new Error("Failed to insert trajectory ref");
    }

    const trajectoryRefData = await trajectoryRefResponse.json();
    const id = trajectoryRefData.trajectory.id;
    console.log(`Trajectory ref inserted with ID: ${id}`);

    const response = await fetch(`${baseUrl}/trajectories/insert-points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, filePath }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form. Please try again.");
    }

    console.log("Form submitted successfully");
    return { success: true };
  } catch (error) {
    console.error("Error in upload function:", error);
    throw error;
  }
}
