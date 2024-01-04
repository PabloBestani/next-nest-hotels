import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, UpdateResult } from 'typeorm';
import { v4 } from 'uuid';
import { HotelsService } from 'src/hotels/hotels.service';
import { RoomTypeService } from 'src/room-type/room-type.service';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,

    private readonly usersService: UsersService,
    private readonly hotelsService: HotelsService,
    private readonly roomTypeService: RoomTypeService,
  ) {}

  async create(
    {
      totalPrice,
      checkInDate,
      checkOutDate,
      roomTypeId,
      hotelId,
    }: CreateReservationDto,
    { email }: ActiveUserInterface,
  ): Promise<Reservation> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const hotel = await this.hotelsService.findOneById(hotelId);
      const roomType = await this.roomTypeService.findOne(roomTypeId);

      if (!user) throw new NotFoundException('User not found');
      if (!hotel) throw new NotFoundException('Hotel not found');
      if (!roomType) throw new NotFoundException('Room type not found');

      const newReservation = this.reservationsRepository.create({
        id: v4(),
        totalPrice,
        checkInDate,
        checkOutDate,
        user,
        hotel,
        roomType,
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
      relations: ['hotel', 'user', 'roomType'],
    });
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOneBy({ id });

    if (!reservation) throw new NotFoundException('Reservation not found');

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

    if (userEmail) {
      const user = await this.usersService.findOneByEmail(userEmail);
      if (!user) throw new NotFoundException('User not found');
      reservation.user = user;
    }

    if (hotelId) {
      const hotel = await this.hotelsService.findOneById(hotelId);
      if (!hotel) throw new NotFoundException('Hotel not found');
      reservation.hotel = hotel;
    }

    if (roomTypeId) {
      const roomType = await this.roomTypeService.findOne(roomTypeId);
      if (!roomType) throw new NotFoundException('Room type not found');
      reservation.roomType = roomType;
    }

    if (checkInDate) reservation.checkInDate = checkInDate;
    if (checkOutDate) reservation.checkOutDate = checkOutDate;
    if (totalPrice) reservation.totalPrice = totalPrice;
  }
}
