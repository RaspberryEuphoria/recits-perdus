/*
  Warnings:

  - Changed the type of `birthdate` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" INTEGER NOT NULL;
