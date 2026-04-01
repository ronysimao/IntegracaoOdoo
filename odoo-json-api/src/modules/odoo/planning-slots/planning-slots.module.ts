import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListPlanningSlotsController } from './controllers/list-planning-slots.controller';
import { ReadPlanningSlotController } from './controllers/read-planning-slot.controller';
import { ListPlanningSlotsService } from './services/list-planning-slots.service';
import { ReadPlanningSlotService } from './services/read-planning-slot.service';

@Module({
  imports: [CommonModule],
  controllers: [ListPlanningSlotsController, ReadPlanningSlotController],
  providers: [ListPlanningSlotsService, ReadPlanningSlotService],
})
export class PlanningSlotsModule {}
