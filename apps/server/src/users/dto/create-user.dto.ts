import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 20)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsOptional()
  @IsUUID(4, { each: true })
  reservationIds: string[];
}
