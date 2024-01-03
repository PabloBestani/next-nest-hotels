import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @Length(3, 30)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
