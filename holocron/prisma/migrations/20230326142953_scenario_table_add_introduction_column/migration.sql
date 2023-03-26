/*
  Warnings:

  - Added the required column `introduction` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "introduction" VARCHAR(500) NOT NULL;
