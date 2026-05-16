/*
  Warnings:

  - Added the required column `feed_name` to the `Config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed_source` to the `Config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed_url` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Config` ADD COLUMN `feed_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `feed_source` VARCHAR(255) NOT NULL,
    ADD COLUMN `feed_url` VARCHAR(255) NOT NULL;
