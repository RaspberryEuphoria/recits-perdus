/*
  Warnings:

  - Added the required column `origin` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "isTitleSuffix" BOOLEAN DEFAULT false,
ADD COLUMN     "origin" VARCHAR(255),
ADD COLUMN     "title" VARCHAR(255);

UPDATE "Character" SET "origin" = '';
UPDATE "Character" SET "title" = '';

-- Then set the column as non-nullable
ALTER TABLE "Character" ALTER COLUMN "isTitleSuffix" SET NOT NULL,
ALTER COLUMN "origin" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;