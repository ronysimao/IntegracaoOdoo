import { z } from 'zod';
import {
  OdooListQueryDto,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const odooModelParamSchema = z.object({
  model: z
    .string({ message: 'Informe o nome técnico do modelo do Odoo.' })
    .trim()
    .regex(/^[a-zA-Z0-9_.]+$/, 'Informe um modelo técnico válido do Odoo.'),
});

export const listModelFieldsSchema = odooListQuerySchema.extend({
  search: z.string().trim().min(1).optional(),
});

export type OdooModelParamDto = z.infer<typeof odooModelParamSchema>;
export type ListModelFieldsDto = z.infer<typeof listModelFieldsSchema> &
  OdooListQueryDto;
