"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const filesPath = process.env.NEXT_PUBLIC_FILES_FOLDER_PATH;

export default async function upload(data) {
  try {
    // Extract file and metadata from the form data
    const file = data.get("file");
    const name = data.get("name");
    const robotId = data.get("robotId");
    const activityId = data.get("activityId");

    if (!file) {
      throw new Error("No file uploaded");
    }

    if (file.name.split(".").pop() !== "traj") {
      throw new Error("Please upload a .traj file");
    }

    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(filesPath, file.name);
    await writeFile(filePath, buffer);

    // Log for debugging
    console.log(`File saved to ${filePath}`);
    console.log(
      `Name: ${name}, Robot ID: ${robotId}, Activity ID: ${activityId}`
    );

    // Insert data into trajectory_ref table
    const trajectoryRefResponse = await fetch(`${baseUrl}/trajectories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        robot_id: robotId,
        activity_id: activityId,
      }),
    });

    if (!trajectoryRefResponse.ok) {
      throw new Error("Failed to insert trajectory reference");
    }

    const trajectoryRefData = await trajectoryRefResponse.json();
    const id = trajectoryRefData.trajectory.id;
    console.log(`Trajectory reference inserted with ID: ${id}`);

    // Insert trajectory points
    const pointsResponse = await fetch(
      `${baseUrl}/trajectories/insert-points`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, filePath }),
      }
    );

    if (!pointsResponse.ok) {
      throw new Error("Failed to submit trajectory points");
    }

    console.log("Trajectory points submitted successfully");

    // Fetch the plot_id using the trajectory_id
    const plotIdResponse = await fetch(`${baseUrl}/trajectories/plot/${id}`);

    if (!plotIdResponse.ok) {
      throw new Error("Failed to fetch plot_id");
    }

    const plotIdData = await plotIdResponse.json();
    const plotId = plotIdData.plot_id;
    console.log(`Fetched plot_id: ${plotId}`);

    // Update trajectory_ref with the plot_id
    const updateRefResponse = await fetch(`${baseUrl}/trajectories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plot_id: plotId }),
    });

    if (!updateRefResponse.ok) {
      throw new Error("Failed to update trajectory reference with plot_id");
    }

    console.log("Trajectory reference updated with plot_id successfully");
    return { success: true };
  } catch (error) {
    console.error("Error in upload function:", error);
    throw error;
  }
}
