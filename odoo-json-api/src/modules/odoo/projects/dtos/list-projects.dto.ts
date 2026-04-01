import { z } from 'zod';
import {
  OdooListQueryDto,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listProjectsSchema = odooListQuerySchema.extend({
  search: z.string().trim().min(1).optional(),
});

export type ListProjectsDto = z.infer<typeof listProjectsSchema> &
  OdooListQueryDto;
