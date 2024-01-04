import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(Role.USER)
  @Get('/profile')
  profile(@ActiveUser() { email }: ActiveUserInterface) {
    return this.usersService.findOneByEmail(email);
  }

  @Auth(Role.USER)
  @Patch('/profile')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() { email }: ActiveUserInterface,
  ) {
    return this.usersService.updateWithoutUsingId(updateUserDto, email);
  }

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() { email }: ActiveUserInterface,
  ) {
    return this.usersService.updateUsingId(id, updateUserDto, email);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @ActiveUser() { email }: ActiveUserInterface,
  ) {
    return this.usersService.remove(id, email);
  }
}
