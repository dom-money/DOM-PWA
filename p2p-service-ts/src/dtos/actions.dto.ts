import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  public type: string;
}
