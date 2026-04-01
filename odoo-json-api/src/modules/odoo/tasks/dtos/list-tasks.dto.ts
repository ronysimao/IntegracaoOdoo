import { z } from 'zod';
import {
  OdooListQueryDto,
  odooDateSchema,
  odooIntegerSchema,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listTasksSchema = odooListQuerySchema.extend({
  projectId: odooIntegerSchema.optional(),
  search: z.string().trim().min(1).optional(),
  stageId: odooIntegerSchema.optional(),
  userId: odooIntegerSchema.optional(),
  dateFrom: odooDateSchema.optional(),
  dateTo: odooDateSchema.optional(),
});

export type ListTasksDto = z.infer<typeof listTasksSchema> & OdooListQueryDto;
