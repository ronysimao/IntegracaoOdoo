import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readPlanningSlotSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de slot de planejamento válido.',
  }),
});

export type ReadPlanningSlotDto = z.infer<typeof readPlanningSlotSchema>;
