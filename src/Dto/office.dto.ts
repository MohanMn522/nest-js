import { IsNumber, IsString } from 'class-validator';

export class Office {

  @IsString()
  name: string;

  @IsNumber()
  id: number;

  @IsString()
  emai: string;
}