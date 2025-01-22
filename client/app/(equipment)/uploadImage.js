"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const path = process.env.NEXT_PUBLIC_FILES_FOLDER_PATH;

export default async function upload(data) {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const filePath = join(path, file.name);
  await writeFile(filePath, buffer);

  const name = data.get("name");
  const working_width_m = data.get("working_width_m")|| null;
  const trailed_or_carried = data.get("trailed_or_carried")|| null;
  const required_power_kw = data.get("required_power_kw")|| null;
  const number_of_teeth = data.get("number_of_teeth")|| null;
  const tooth_width_cm = data.get("tooth_width_cm")|| null;
  const capacity_l = data.get("capacity_l")|| null;
  const hitch = data.get("hitch") || null;
  const pneumatic = data.get("pneumatic")|| null;
  const power_take_off = data.get("power_take_off")|| null;
  const hitch_ground_clearance = data.get("hitch_ground_clearance")|| null;
  const weight_kg = data.get("weight_kg")|| null;

  console.log(name + filePath);
  const trajectoryRefResponse = await fetch(`${baseUrl}/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      working_width_m: working_width_m,
      trailed_or_carried: trailed_or_carried,
      required_power_kw: required_power_kw,
      number_of_teeth: number_of_teeth,
      tooth_width_cm: tooth_width_cm,
      capacity_l: capacity_l,
      hitch: hitch,
      pneumatic: pneumatic,
      power_take_off: power_take_off,
      hitch_ground_clearance: hitch_ground_clearance,
      weight_kg: weight_kg,
      imagePath: filePath,
    }),
  });

  if (!trajectoryRefResponse.ok) {
    console.error("Failed to insert equipment!");
    return;
  }

  return { success: true };
}
