import * as z from "zod";

export const activitySchema = z.object({
  name: z.string(),
  category: z.any(),
});
