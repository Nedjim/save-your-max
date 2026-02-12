import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  charge: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  reps: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date;
}
