import { z } from 'zod';
import {
  OdooListQueryDto,
  odooIntegerSchema,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listTaskStagesSchema = odooListQuerySchema.extend({
  projectId: odooIntegerSchema.optional(),
  search: z.string().trim().min(1).optional(),
});

export type ListTaskStagesDto = z.infer<typeof listTaskStagesSchema> &
  OdooListQueryDto;
