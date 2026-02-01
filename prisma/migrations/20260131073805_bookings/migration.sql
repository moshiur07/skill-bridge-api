/*
  Warnings:

  - Added the required column `duration_hours` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "duration_hours" INTEGER NOT NULL;
