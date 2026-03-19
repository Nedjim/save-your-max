import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { PerformancesService } from './performances.service';

@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePerformanceDto) {
    return this.performancesService.update(id, {
      ...data,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.performancesService.delete(id);
  }
}
