import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: createSpotDto.eventId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
        eventId: createSpotDto.eventId,
      },
    });
  }

  async findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  async findOne(eventId: string, spotId: string) {
    const spot = await this.prismaService.spot.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    });

    if (!spot) {
      throw new NotFoundException('Spot not found');
    }

    return spot;
  }

  async update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    await this.findOne(eventId, spotId); // Ensure spot exists

    return this.prismaService.spot.update({
      where: {
        id: spotId,
      },
      data: updateSpotDto,
    });
  }

  async remove(eventId: string, spotId: string) {
    await this.findOne(eventId, spotId); // Ensure spot exists

    return this.prismaService.spot.delete({
      where: {
        id: spotId,
      },
    });
  }
}
