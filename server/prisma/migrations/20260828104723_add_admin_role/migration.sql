/*
  Warnings:

  - A unique constraint covering the columns `[dorm_number]` on the table `dormitories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "UserRoleType" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "room_number" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "dormitories_dorm_number_key" ON "dormitories"("dorm_number");
