import { Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private readonly roomTypesRepository: Repository<RoomType>,
  ) {}

  async create(createRoomTypeDto: CreateRoomTypeDto) {
    const newRoomType = this.roomTypesRepository.create(createRoomTypeDto);
    return await this.roomTypesRepository.save(newRoomType);
  }

  async findAll() {
    return this.roomTypesRepository.find();
  }

  async findOne(id: number) {
    return this.roomTypesRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    return this.roomTypesRepository.update(id, updateRoomTypeDto);
  }

  async remove(id: number) {
    return this.roomTypesRepository.softDelete(id);
  }
}
