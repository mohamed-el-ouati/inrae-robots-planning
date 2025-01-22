import * as z from "zod";

export const taskSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  activity_category: z.string(),
  activity: z.string(),
  robot: z.string(),
  equipment: z.string(),
  plot: z.string(),
});

export const taskDefaultValues = {
  activity_category: "",
  activity: "",
  robot: "",
  plot: "",
  equipment: "",
  start_date: new Date(),
  end_date: new Date(),
};