/*
  Warnings:

  - Added the required column `textColor` to the `CharactersOnScenarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharactersOnScenarios" ADD COLUMN     "textColor" VARCHAR(7) NOT NULL;
