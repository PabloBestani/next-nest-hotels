import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('room-type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTypeService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    return this.roomTypeService.update(+id, updateRoomTypeDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypeService.remove(+id);
  }
}
