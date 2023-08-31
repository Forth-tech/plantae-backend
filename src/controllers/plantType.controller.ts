import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  CreatePlantTypeDto,
  CreatePlantTypeResponseDto,
} from 'src/core/dtos/plantType.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { PlantTypeFactory } from 'src/use-cases/plantType/plantType-factory.service';
import { PlantTypeUseCases } from 'src/use-cases/plantType/plantType.use-case';

@Controller('/plantType')
export class PlantTypeController {
  constructor(
    private plantTypeUseCases: PlantTypeUseCases,
    private plantTypeFactory: PlantTypeFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPlantTypeById(@Param('id') id: string) {
    return this.plantTypeUseCases.getPlantTypeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPlantType(
    @Body() plantTypeDto: CreatePlantTypeDto,
  ): Promise<CreatePlantTypeResponseDto> {
    const createPlantTypeResponse = new CreatePlantTypeResponseDto();

    try {
      const plantType = this.plantTypeFactory.createNewPlantType(plantTypeDto);
      const createdPlantType = await this.plantTypeUseCases.createPlantType(
        plantType,
      );

      createPlantTypeResponse.plantType = createdPlantType;
      createPlantTypeResponse.success = true;
    } catch (error) {
      createPlantTypeResponse.success = false;
    }

    return createPlantTypeResponse;
  }
}
