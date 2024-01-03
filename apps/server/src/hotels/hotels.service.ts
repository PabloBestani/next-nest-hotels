import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelRepository } from './hotels.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: HotelRepository,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const newHotel = this.hotelRepository.create({
      ...createHotelDto,
      id: v4(),
    });
    return await this.hotelRepository.save(newHotel);
  }

  async findAll(): Promise<Hotel[]> {
    return await this.hotelRepository.find();
  }

  async findOneById(id: string): Promise<Hotel | null> {
    return await this.hotelRepository.findOneBy({ id });
  }

  async findOneByIdWithRoomTypes(id: string): Promise<Hotel | null> {
    return await this.hotelRepository.findOne({
      where: { id },
      relations: ['roomTypes'],
    });
  }

  async findOneByIdWithReservations(id: string): Promise<Hotel | null> {
    return await this.hotelRepository.findOneWithReservationsAndUserEmail(id);
  }

  update(id: string, updateHotelDto: UpdateHotelDto): Promise<UpdateResult> {
    return this.hotelRepository.update(id, updateHotelDto);
  }

  remove(id: string): Promise<UpdateResult> {
    return this.hotelRepository.softDelete(id);
  }
}
