import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateExercisesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, {
    message: 'The title is too long',
  })
  title: string;
}
