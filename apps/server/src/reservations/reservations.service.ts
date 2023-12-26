import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}

  async create({
    totalPrice,
    checkInDate,
    checkOutDate,
  }: CreateReservationDto) {
    const newReservation = this.reservationsRepository.create({
      id: v4(),
      totalPrice,
      checkInDate,
      checkOutDate,
    });

    return await this.reservationsRepository.save(newReservation);
  }

  async findAll() {
    return this.reservationsRepository.find();
  }

  async findOne(id: string) {
    return this.reservationsRepository.findOneBy({ id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.update(id, updateReservationDto);
  }

  async remove(id: string) {
    return this.reservationsRepository.softDelete(id);
  }
}
