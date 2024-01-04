import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Auth(Role.USER)
  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.reservationsService.create(createReservationDto, user);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @ActiveUser() { email }: ActiveUserInterface,
  ) {
    return this.reservationsService.findOne(id, email);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
