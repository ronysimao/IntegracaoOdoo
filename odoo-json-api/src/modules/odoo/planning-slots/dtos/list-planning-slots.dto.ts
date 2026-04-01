import { z } from 'zod';
import {
  OdooListQueryDto,
  odooDateSchema,
  odooIntegerSchema,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listPlanningSlotsSchema = odooListQuerySchema.extend({
  projectId: odooIntegerSchema.optional(),
  taskId: odooIntegerSchema.optional(),
  employeeId: odooIntegerSchema.optional(),
  resourceId: odooIntegerSchema.optional(),
  dateFrom: odooDateSchema.optional(),
  dateTo: odooDateSchema.optional(),
});

export type ListPlanningSlotsDto = z.infer<typeof listPlanningSlotsSchema> &
  OdooListQueryDto;
