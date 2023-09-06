import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDataServiceModule } from './frameworks/data-services/prisma.module';
import { UserController } from './controllers/user.controller';
import { UserUseCasesModule } from './use-cases/user/user-use-case.module';
import { PassportServiceModule } from './frameworks/auth-services/passport/passport-service.module';
import { LoggerModule } from 'nestjs-pino';
import { PlantTypeController } from './controllers/plantType.controller';
import { PlantTypeUseCasesModule } from './use-cases/plantType/plantType-use-case.module';
import { UserPlantUseCasesModule } from './use-cases/userPlant/userPlant-use-case.module';
import { UserPlantNotesUseCasesModule } from './use-cases/userPlantNotes/userPlantNotes-use-case.module';
import { UserPlantImageUseCasesModule } from './use-cases/userPlantImage/userPlantImage-use-case.module';
import { UserPlantController } from './controllers/userPlant.controller';
import { UserPlantWateringUseCasesModule } from './use-cases/userPlantWatering/userPlantWatering-use-case.module';
import { UserPlantNutritionUseCasesModule } from './use-cases/userPlantNutrition/userPlantNutrition-use-case.module';

@Module({
  imports: [
    PrismaDataServiceModule,
    PassportServiceModule,
    UserUseCasesModule,
    PlantTypeUseCasesModule,
    UserPlantUseCasesModule,
    UserPlantNotesUseCasesModule,
    UserPlantImageUseCasesModule,
    UserPlantWateringUseCasesModule,
    UserPlantNutritionUseCasesModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    PlantTypeController,
    UserPlantController,
  ],
  providers: [AppService],
})
export class AppModule {}
