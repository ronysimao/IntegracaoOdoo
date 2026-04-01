import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readProjectSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de projeto válido.',
  }),
});

export type ReadProjectDto = z.infer<typeof readProjectSchema>;
