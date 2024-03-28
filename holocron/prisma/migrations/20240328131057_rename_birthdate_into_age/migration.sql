/*
  Warnings:

  - You are about to drop the column `birthdate` on the `Character` table. All the data in the column will be lost.
  - Added the required column `age` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "birthdate";

/* Create a nullable column */
ALTER TABLE "Character" ADD COLUMN     "age" INTEGER;

/* Set a default value for the previous entries in the table */
UPDATE "Character" SET "age" = 0;

/* Then set the column as non-nullable */
ALTER TABLE "Character" ALTER COLUMN "age" SET NOT NULL;


