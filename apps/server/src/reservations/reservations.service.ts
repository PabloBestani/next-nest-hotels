import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, UpdateResult } from 'typeorm';
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
  }: CreateReservationDto): Promise<Reservation> {
    try {
      const hotel = await this.hotelsService.findOneById(hotelId);
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

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationsRepository.findOne({
      where: { id },
      relations: ['hotel', 'userEmail', 'roomType'],
    });
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOneBy({ id });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    await this.updateReservation(reservation, updateReservationDto);

    return await this.reservationsRepository.save(reservation);
  }

  async remove(id: string): Promise<UpdateResult> {
    return this.reservationsRepository.softDelete(id);
  }

  private async updateReservation(
    reservation: Reservation,
    dto: UpdateReservationDto,
  ): Promise<void> {
    const {
      hotelId,
      roomTypeId,
      userEmail,
      checkInDate,
      checkOutDate,
      totalPrice,
    } = dto;

    if (hotelId) {
      const hotel = await this.hotelsService.findOneById(hotelId);
      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }
      reservation.hotel = hotel;
    }

    if (roomTypeId) {
      const roomType = await this.roomTypeService.findOne(roomTypeId);
      if (!roomType) {
        throw new NotFoundException('Room type not found');
      }
      reservation.roomType = roomType;
    }

    if (userEmail) reservation.userEmail = userEmail;
    if (checkInDate) reservation.checkInDate = checkInDate;
    if (checkOutDate) reservation.checkOutDate = checkOutDate;
    if (totalPrice) reservation.totalPrice = totalPrice;
  }
}
