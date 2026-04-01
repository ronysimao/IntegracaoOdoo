import { z } from 'zod';
import { odooIntegerSchema } from '../../common/dtos/odoo-list-query.dto';

export const readEmployeeSchema = z.object({
  id: odooIntegerSchema.refine((value) => value > 0, {
    message: 'Informe um ID de colaborador válido.',
  }),
});

export type ReadEmployeeDto = z.infer<typeof readEmployeeSchema>;
