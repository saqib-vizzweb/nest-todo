import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
