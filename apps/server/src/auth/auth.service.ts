import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password, role }: RegisterDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) throw new BadRequestException('Email is not available');
    return await this.usersService.create({
      name,
      email,
      password,
      role,
    });
  }

  async login({ email, password }: LoginDto): Promise<{
    email: string;
    token: string;
  }> {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user || !(await bcryptjs.compare(password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: ActiveUserInterface = { email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      email,
      token,
    };
  }
}
