import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { Repository } from 'typeorm';
import { HotelsService } from 'src/hotels/hotels.service';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private readonly roomTypesRepository: Repository<RoomType>,

    private readonly hotelsService: HotelsService,
  ) {}

  async create(createRoomTypeDto: CreateRoomTypeDto) {
    try {
      const hotel = await this.hotelsService.findOneById(
        createRoomTypeDto.hotelId,
      );

      if (!hotel) throw new NotFoundException('Hotel not found');

      const newRoomType = this.roomTypesRepository.create({
        ...createRoomTypeDto,
        hotel,
      });

      return await this.roomTypesRepository.save(newRoomType);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    return this.roomTypesRepository.find({
      relations: ['hotel'],
    });
  }

  async findOne(id: number) {
    return this.roomTypesRepository.findOne({
      where: { id },
      relations: ['hotel'],
    });
  }

  async update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    const roomType = await this.roomTypesRepository.findOneBy({ id });
    if (!roomType) throw new NotFoundException('Room type not found');

    await this.updateRoomType(roomType, updateRoomTypeDto);

    return this.roomTypesRepository.save(roomType);
  }

  async remove(id: number) {
    return this.roomTypesRepository.softDelete(id);
  }

  private async updateRoomType(roomType: RoomType, dto: UpdateRoomTypeDto) {
    const { hotelId, type, description, cost } = dto;

    if (hotelId) {
      const hotel = await this.hotelsService.findOneById(hotelId);
      if (!hotel) throw new NotFoundException('Hotel not found');
      roomType.hotel = hotel;
    }

    if (type) roomType.type = type;
    if (description) roomType.description = description;
    if (cost) roomType.cost = cost;
  }
}
