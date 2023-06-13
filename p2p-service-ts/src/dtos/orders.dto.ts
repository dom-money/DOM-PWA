import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  public pixAddress: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsNumber()
  @IsNotEmpty()
  public usdt_amount: number;
}
