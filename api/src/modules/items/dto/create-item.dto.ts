import { IsDate, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class createItemDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  charge: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  reps: number;

  @IsOptional()
  @IsDate()
  date: Date;
}
