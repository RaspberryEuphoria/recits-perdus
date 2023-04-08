/*
  Warnings:

  - You are about to drop the column `name` on the `Character` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "name",
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL;
