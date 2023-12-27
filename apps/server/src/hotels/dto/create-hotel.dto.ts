import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(0)
  @Max(5)
  stars: number;

  @IsOptional()
  @IsUUID(4, { each: true })
  reservationIds: string[];

  @IsOptional()
  @IsInt()
  @IsPositive()
  roomTypeIds: string[];
}
