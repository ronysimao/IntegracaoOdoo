import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readTimesheetSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de apontamento válido.',
  }),
});

export type ReadTimesheetDto = z.infer<typeof readTimesheetSchema>;
