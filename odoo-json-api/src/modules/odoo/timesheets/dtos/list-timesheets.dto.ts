import { z } from 'zod';
import {
  OdooListQueryDto,
  odooDateSchema,
  odooIntegerSchema,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listTimesheetsSchema = odooListQuerySchema.extend({
  projectId: odooIntegerSchema.optional(),
  taskId: odooIntegerSchema.optional(),
  employeeId: odooIntegerSchema.optional(),
  userId: odooIntegerSchema.optional(),
  dateFrom: odooDateSchema.optional(),
  dateTo: odooDateSchema.optional(),
});

export type ListTimesheetsDto = z.infer<typeof listTimesheetsSchema> &
  OdooListQueryDto;
