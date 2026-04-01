import { z } from 'zod';
import {
  OdooListQueryDto,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listEmployeesSchema = odooListQuerySchema.extend({
  search: z.string().trim().min(1).optional(),
});

export type ListEmployeesDto = z.infer<typeof listEmployeesSchema> &
  OdooListQueryDto;
