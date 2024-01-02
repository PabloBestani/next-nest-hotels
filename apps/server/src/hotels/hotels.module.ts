import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel } from './entities/hotel.entity';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { customHotelRepository } from './hotels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [
    {
      provide: getRepositoryToken(Hotel),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource.getRepository(Hotel).extend(customHotelRepository);
      },
    },
    HotelsService,
  ],
  exports: [HotelsService],
})
export class HotelsModule {}
