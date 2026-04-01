import { z } from 'zod';
import {
  odooDateSchema,
  odooIntegerSchema,
  odooListQuerySchema,
} from '../../common/dtos/odoo-list-query.dto';

export const listWorkloadSummarySchema = odooListQuerySchema.extend({
  projectId: odooIntegerSchema.optional(),
  dateFrom: odooDateSchema.describe('Start date (YYYY-MM-DD)'),
  dateTo: odooDateSchema.describe('End date (YYYY-MM-DD)'),
});

export type ListWorkloadSummaryDto = z.infer<typeof listWorkloadSummarySchema>;
