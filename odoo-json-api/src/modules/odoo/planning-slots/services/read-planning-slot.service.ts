import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OdooJson2Service,
  OdooSearchReadParams,
} from '../../common/services/odoo-json-2.service';
import {
  ReadPlanningSlotDto,
  readPlanningSlotSchema,
} from '../dtos/read-planning-slot.dto';

@Injectable()
export class ReadPlanningSlotService {
  constructor(private readonly odooJson2Service: OdooJson2Service) {}

  async execute(params: ReadPlanningSlotDto) {
    const parsedParams = readPlanningSlotSchema.parse(params);

    const odooSearchParams: OdooSearchReadParams = {
      domain: [['id', '=', parsedParams.id]],
      limit: 1,
    };

    const planningSlots = await this.odooJson2Service.searchRead(
      'planning.slot',
      odooSearchParams,
    );

    const planningSlot = planningSlots[0];

    if (!planningSlot) {
      throw new NotFoundException(
        'O slot de planejamento informado não foi localizado.',
      );
    }

    return planningSlot;
  }
}
