/*
  Warnings:

  - Added the required column `isBurned` to the `DicesOnMoves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DicesOnMoves" ADD COLUMN     "isBurned" BOOLEAN NOT NULL;
