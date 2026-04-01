import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readTaskSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de tarefa válido.',
  }),
});

export type ReadTaskDto = z.infer<typeof readTaskSchema>;
