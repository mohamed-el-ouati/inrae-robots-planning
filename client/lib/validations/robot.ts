import * as z from "zod";

export const robotSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  weight: z.coerce.number().optional().nullable(),
  puissance_kwh: z.coerce.number().optional().nullable(),
  recharge_time: z.string().optional().nullable(),
  operating_time: z.string().optional().nullable(),
  frontaxle_steeringspeed: z.coerce.number().optional().nullable(),
  maxangle_steering: z.coerce.number().optional().nullable(),
  rearaxle_steeringspeed: z.number().optional().nullable(),
  id_powercat: z.string(),
  availableTill: z.string().optional().nullable(),
  steering_wheel: z.coerce.number().optional().nullable(),
  driving_wheel: z.coerce.number().optional().nullable(),
  dim_length: z.coerce.number().optional().nullable(),
  dim_width: z.coerce.number().optional().nullable(),
  dim_height: z.coerce.number().optional().nullable(),
  // image_data: z.any(),
});
