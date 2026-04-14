import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Your name is too long',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Your surname is too long',
  })
  surname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'Your pseudo is too long',
  })
  pseudo?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthday?: Date;
}
