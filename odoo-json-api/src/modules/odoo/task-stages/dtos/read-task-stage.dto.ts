import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readTaskStageSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de etapa válido.',
  }),
});

export type ReadTaskStageDto = z.infer<typeof readTaskStageSchema>;
