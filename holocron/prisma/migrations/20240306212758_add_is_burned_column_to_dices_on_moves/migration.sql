/*
  Warnings:

  - Added the required column `isBurned` to the `DicesOnMoves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

/* Create a nullable column */
ALTER TABLE "DicesOnMoves" ADD COLUMN     "isBurned" BOOLEAN;

/* Set a default value for the previous entries in the table */
UPDATE "DicesOnMoves" SET "isBurned" = false;

/* Then set the column as non-nullable */
ALTER TABLE "DicesOnMoves" ALTER COLUMN "isBurned" SET NOT NULL;