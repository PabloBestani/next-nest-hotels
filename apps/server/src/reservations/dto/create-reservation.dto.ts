import { IsDateString, IsDecimal } from 'class-validator';

export class CreateReservationDto {
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  totalPrice: string;

  @IsDateString()
  checkInDate: Date;

  @IsDateString()
  checkOutDate: Date;
}
