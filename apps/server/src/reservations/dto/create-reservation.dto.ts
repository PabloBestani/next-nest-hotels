import {
  IsDateString,
  IsDecimal,
  IsEmail,
  IsInt,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateReservationDto {
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @IsPositive()
  totalPrice: string;

  @IsDateString()
  checkInDate: Date;

  @IsDateString()
  checkOutDate: Date;

  @IsEmail()
  userEmail: string;

  @IsUUID(4)
  hotelId: string;

  @IsInt()
  @IsPositive()
  roomTypeId: number;
}
