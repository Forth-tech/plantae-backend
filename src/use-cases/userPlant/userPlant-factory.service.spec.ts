import { Test, TestingModule } from '@nestjs/testing';
import { UserPlantFactoryService } from './userPlant-factory.service';
import { CreateUserPlantDto } from '../../core/dtos/userPlant.dto';
import { FeedingPeriod, WateringPeriod } from '@prisma/client';

describe('UserPlantFactoryService', () => {
  let service: UserPlantFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPlantFactoryService],
    }).compile();

    service = module.get<UserPlantFactoryService>(UserPlantFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create UserPlant without purchaseDate', () => {
    const userPlantDto = new CreateUserPlantDto();
    userPlantDto.ID_plantType = '123';
    userPlantDto.feeeding = {
      ID_Feeding: null,
      period: FeedingPeriod.BIMONTHLY,
      quantity: 1,
    };
    userPlantDto.watering = {
      ID_Watering: null,
      period: WateringPeriod.WEEKLY,
      volume: 1,
    };
    userPlantDto.name = 'test';

    const userPlant = service.createNewUserPlant('testUser', userPlantDto);
    expect(userPlant).toBeDefined();
    expect(userPlant.purchasedDate).toBeUndefined();
  });

  it('should create UserPlant without purchaseDate', () => {
    const userPlantDto = new CreateUserPlantDto();
    userPlantDto.ID_plantType = '123';
    userPlantDto.feeeding = {
      ID_Feeding: null,
      period: FeedingPeriod.BIMONTHLY,
      quantity: 1,
    };
    userPlantDto.watering = {
      ID_Watering: null,
      period: WateringPeriod.WEEKLY,
      volume: 1,
    };
    userPlantDto.name = 'test';
    userPlantDto.purchasedDate = new Date();

    const userPlant = service.createNewUserPlant('testUser', userPlantDto);
    expect(userPlant).toBeDefined();
    expect(userPlant.purchasedDate).toBeDefined();
  });
});
