import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { HotelsService } from 'src/hotels/hotels.service';
import { RoomTypeService } from 'src/room-type/room-type.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,

    private readonly hotelsService: HotelsService,
    private readonly roomTypeService: RoomTypeService,
  ) {}

  async create({
    totalPrice,
    checkInDate,
    checkOutDate,
    userEmail,
    roomTypeId,
    hotelId,
  }: CreateReservationDto) {
    try {
      const hotel = await this.hotelsService.findOne(hotelId);
      const roomType = await this.roomTypeService.findOne(roomTypeId);

      if (!hotel || !roomType) {
        throw new Error('Hotel or Room type not found');
      }

      const newReservation = this.reservationsRepository.create({
        id: v4(),
        totalPrice,
        checkInDate,
        checkOutDate,
        hotel,
        roomType,
        userEmail,
      });

      return await this.reservationsRepository.save(newReservation);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    return this.reservationsRepository.find();
  }

  async findOne(id: string) {
    return this.reservationsRepository.findOne({
      where: { id },
      relations: ['hotel', 'userEmail', 'roomType'],
    });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.update(id, updateReservationDto);
  }

  async remove(id: string) {
    return this.reservationsRepository.softDelete(id);
  }
}
