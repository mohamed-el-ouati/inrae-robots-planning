"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const path = process.env.NEXT_PUBLIC_FILES_FOLDER_PATH;

export default async function insertRobot(data) {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Read the file into a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define file path and write the file to the filesystem
  const filePath = join(path, file.name);
  await writeFile(filePath, buffer);

  // Extracting data from form fields
  const name = data.get("name") || null;
  const description = data.get("description") || null;

  const locomotion = data.get("locomotion") || null;
  const weight_kg = data.get("weight_kg") || null;
  const length_mm = data.get("length_mm") || null;
  const width_mm = data.get("width_mm") || null;
  const height_mm = data.get("height_mm") || null;
  const max_speed_mps = data.get("max_speed_mps") || null;
  const autonomy = data.get("autonomy") || null;
  const manipulation = data.get("manipulation") || null;
  const on_board_sensors = data.get("on_board_sensors") || null;
  // const activity_id = data.get("activity_id") || null;

  try {
    // Make a POST request to insert the robot data
    const response = await fetch(`${baseUrl}/robots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        locomotion,
        weight_kg,
        length_mm,
        width_mm,
        height_mm,
        max_speed_mps,
        autonomy,
        manipulation,
        on_board_sensors,
        imagePath: filePath, // Path of the uploaded file
        // activity_id,
      }),
    });

    if (!response.ok) {
      const responseBody = await response.text(); // Read the response body
      console.error("Failed to insert robot!");
      console.error(`Status: ${response.status}`);
      console.error(`Response: ${responseBody}`);
      throw new Error(
        `Failed to insert robot: ${response.status} ${responseBody}`
      );
    }

    return { success: true };
  } catch (error) {
    console.error("Error in insertRobot function:");
    console.error(error);
    throw error;
  }
}
