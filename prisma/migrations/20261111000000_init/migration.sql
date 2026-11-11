-- CreateTable
CREATE TABLE `notices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college` VARCHAR(20) NOT NULL,
    `date` DATE NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `titleMr` VARCHAR(300) NOT NULL DEFAULT '',
    `link` VARCHAR(500) NOT NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `notices_college_published_date_idx`(`college`, `published`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college` VARCHAR(20) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(200) NOT NULL DEFAULT '',
    `course` VARCHAR(100) NOT NULL DEFAULT 'GNM',
    `stream` VARCHAR(50) NOT NULL DEFAULT '',
    `village` VARCHAR(120) NOT NULL DEFAULT '',
    `message` VARCHAR(1000) NOT NULL DEFAULT '',
    `language` VARCHAR(5) NOT NULL DEFAULT 'en',
    `status` ENUM('new', 'contacted', 'admitted', 'closed') NOT NULL DEFAULT 'new',
    `notes` VARCHAR(2000) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `enquiries_college_createdAt_idx`(`college`, `createdAt`),
    INDEX `enquiries_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

