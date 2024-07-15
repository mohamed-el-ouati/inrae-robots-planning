import * as z from "zod";

export const taskSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  activity_category: z.string(),
  activity: z.string(),
  robot: z.string(),
  equipment: z.string(),
  plot: z.string(),
  trajectory: z.any(),
  // itk_id: z.number(),
  // itk_order: z.number(),
});
