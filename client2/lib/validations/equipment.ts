import * as z from "zod";

export const equipmentSchema = z.object({
  name: z.string(),
  working_width_m: z.coerce.number().optional().nullable(),
  trailed_or_carried: z.any(),
  required_power_kw: z.coerce.number().optional().nullable(),
  number_of_teeth: z.coerce.number().int().optional().nullable(),
  tooth_width_cm: z.coerce.number().optional().nullable(),
  capacity_l: z.coerce.number().optional().nullable(),
  hitch: z.string().optional().nullable(),
  pneumatic: z.string(), //boolean
  power_take_off: z.string(), //boolean
  hitch_ground_clearance: z.coerce.number().optional().nullable(),
  weight_kg: z.coerce.number().optional().nullable(),
});
