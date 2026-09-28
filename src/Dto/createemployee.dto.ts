import { IsNumber, IsString } from 'class-validator';

export class CreateEmployee {

  @IsString()
  name: string;

  @IsNumber()
  id: number;

  @IsString()
  email: string;
}