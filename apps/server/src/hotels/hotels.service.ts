import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    const newHotel = this.hotelRepository.create({
      ...createHotelDto,
      id: v4(),
    });
    return await this.hotelRepository.save(newHotel);
  }

  async findAll() {
    return await this.hotelRepository.find();
  }

  async findOneById(id: string) {
    return await this.hotelRepository.findOneBy({ id });
  }

  async findOneByIdWithRoomTypes(id: string) {
    return await this.hotelRepository.findOne({
      where: { id },
      relations: ['roomTypes'],
    });
  }

  async findOneByIdWithReservations(id: string) {
    return await this.hotelRepository.findOne({
      where: { id },
      relations: ['reservations'],
    });
  }

  update(id: string, updateHotelDto: UpdateHotelDto) {
    return this.hotelRepository.update(id, updateHotelDto);
  }

  remove(id: string) {
    return this.hotelRepository.softDelete(id);
  }
}
