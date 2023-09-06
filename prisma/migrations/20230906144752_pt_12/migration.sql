-- CreateTable
CREATE TABLE `UserPlantWatering` (
    `ID_UserPlantWatering` VARCHAR(191) NOT NULL,
    `ID_UserPlant` VARCHAR(191) NOT NULL,
    `volume` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_UserPlantWatering`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlantNutrition` (
    `ID_UserPlantNutrition` VARCHAR(191) NOT NULL,
    `ID_UserPlant` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_UserPlantNutrition`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPlantWatering` ADD CONSTRAINT `UserPlantWatering_ID_UserPlant_fkey` FOREIGN KEY (`ID_UserPlant`) REFERENCES `UserPlant`(`ID_UserPLant`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlantNutrition` ADD CONSTRAINT `UserPlantNutrition_ID_UserPlant_fkey` FOREIGN KEY (`ID_UserPlant`) REFERENCES `UserPlant`(`ID_UserPLant`) ON DELETE RESTRICT ON UPDATE CASCADE;
