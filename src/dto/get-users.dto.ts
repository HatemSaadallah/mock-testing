import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetUsersDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
