-- CreateTable
CREATE TABLE `UserPlant` (
    `ID_UserPLant` VARCHAR(191) NOT NULL,
    `ID_User` VARCHAR(191) NOT NULL,
    `ID_PlantType` VARCHAR(191) NOT NULL,
    `purchasedDate` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `ID_Watering` VARCHAR(191) NOT NULL,
    `ID_Feeding` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_UserPLant`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watering` (
    `ID_Watering` VARCHAR(191) NOT NULL,
    `period` ENUM('DAILY', 'EVERYOTHER', 'WEEKLY', 'BIWEEKLY', 'MONTHLY') NOT NULL,
    `volume` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Watering`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feeding` (
    `ID_Feeding` VARCHAR(191) NOT NULL,
    `period` ENUM('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'BIMONTHLY', 'TRI') NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Feeding`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlantNote` (
    `ID_UserPlantNote` VARCHAR(191) NOT NULL,
    `ID_UserPlant` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_UserPlantNote`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlantImage` (
    `ID_UserPlantImage` VARCHAR(191) NOT NULL,
    `ID_UserPlant` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ID_UserPlantImage`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_ID_User_fkey` FOREIGN KEY (`ID_User`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_ID_PlantType_fkey` FOREIGN KEY (`ID_PlantType`) REFERENCES `PlantType`(`ID_PlantType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_ID_Watering_fkey` FOREIGN KEY (`ID_Watering`) REFERENCES `Watering`(`ID_Watering`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_ID_Feeding_fkey` FOREIGN KEY (`ID_Feeding`) REFERENCES `Feeding`(`ID_Feeding`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlantNote` ADD CONSTRAINT `UserPlantNote_ID_UserPlant_fkey` FOREIGN KEY (`ID_UserPlant`) REFERENCES `UserPlant`(`ID_UserPLant`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlantImage` ADD CONSTRAINT `UserPlantImage_ID_UserPlant_fkey` FOREIGN KEY (`ID_UserPlant`) REFERENCES `UserPlant`(`ID_UserPLant`) ON DELETE RESTRICT ON UPDATE CASCADE;
