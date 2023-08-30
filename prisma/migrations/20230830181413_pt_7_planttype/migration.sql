-- CreateTable
CREATE TABLE `PlantType` (
    `ID_PlantType` VARCHAR(191) NOT NULL,
    `scientificName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`ID_PlantType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantTypePopularName` (
    `ID_PlantTypePopularName` VARCHAR(191) NOT NULL,
    `ID_PlantType` VARCHAR(191) NOT NULL,
    `popularName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PlantTypePopularName_ID_PlantType_popularName_key`(`ID_PlantType`, `popularName`),
    PRIMARY KEY (`ID_PlantTypePopularName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlantTypePopularName` ADD CONSTRAINT `PlantTypePopularName_ID_PlantType_fkey` FOREIGN KEY (`ID_PlantType`) REFERENCES `PlantType`(`ID_PlantType`) ON DELETE RESTRICT ON UPDATE CASCADE;
