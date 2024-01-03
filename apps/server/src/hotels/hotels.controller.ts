import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOneById(id);
  }

  @Get(':id/room-types')
  findOneWithRoomTypes(@Param('id') id: string) {
    return this.hotelsService.findOneByIdWithRoomTypes(id);
  }

  @Auth(Role.ADMIN)
  @Get(':id/reservations')
  findOneWithReservations(@Param('id') id: string) {
    return this.hotelsService.findOneByIdWithReservations(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(id);
  }
}
