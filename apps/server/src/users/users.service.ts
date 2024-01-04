import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ name, email, password, role }: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      id: v4(),
      name,
      email,
      password: await bcryptjs.hash(password, 10),
      role,
    });

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneByEmailWithPassword(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      select: { role: true, password: true },
    });
  }

  async update(
    id: string,
    { name }: UpdateUserDto,
    email: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');
    if (user.email === email) {
      throw new UnauthorizedException('Admins cannot edit own user info');
    }

    if (name) user.name = name;
    return await this.usersRepository.save(user);
  }

  async remove(id: string, email: string): Promise<UpdateResult> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    if (user.email === email) {
      throw new UnauthorizedException('Admins cannot delet own user');
    }

    return await this.usersRepository.softDelete(id);
  }
}
