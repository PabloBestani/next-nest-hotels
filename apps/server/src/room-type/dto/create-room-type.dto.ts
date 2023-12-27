import {
  IsDecimal,
  IsOptional,
  IsPositive,
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
  @IsPositive()
  cost: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  hotelIds: string[];

  @IsOptional()
  @IsUUID(4, { each: true })
  reservationIds: string[];
}
