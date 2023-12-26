import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(0)
  @Max(5)
  stars: number;
}
