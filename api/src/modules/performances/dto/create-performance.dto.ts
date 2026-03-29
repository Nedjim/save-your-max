import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreatePerformanceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  reps: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date;
}
