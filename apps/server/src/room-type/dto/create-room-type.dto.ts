import {
  IsDecimal,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  @Length(3, 15)
  type: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  // @IsPositive()
  cost: string;

  @IsUUID(4)
  hotelId: string;
}
