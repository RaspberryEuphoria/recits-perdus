/*
  Warnings:

  - Added the required column `safeTitle` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "safeTitle" TEXT NOT NULL;
