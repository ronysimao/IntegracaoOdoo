import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ListEmployeesController } from './controllers/list-employees.controller';
import { ReadEmployeeController } from './controllers/read-employee.controller';
import { ListEmployeesService } from './services/list-employees.service';
import { ReadEmployeeService } from './services/read-employee.service';

@Module({
  imports: [CommonModule],
  controllers: [ListEmployeesController, ReadEmployeeController],
  providers: [ListEmployeesService, ReadEmployeeService],
})
export class EmployeesModule {}
