/*
  Warnings:

  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Scenario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

/* Set a default value for the previous entries in the table */
UPDATE "Post" SET "updatedAt" = CURRENT_TIMESTAMP, "createdAt" = CURRENT_TIMESTAMP;

ALTER TABLE "Post" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "Post" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

/* Set a default value for the previous entries in the table */
UPDATE "Scenario" SET "updatedAt" = CURRENT_TIMESTAMP, "createdAt" = CURRENT_TIMESTAMP;

ALTER TABLE "Scenario" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "Scenario" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastActivityAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

/* Set a default value for the previous entries in the table */
UPDATE "User" SET "updatedAt" = CURRENT_TIMESTAMP, "lastActivityAt" = CURRENT_TIMESTAMP, "createdAt" = CURRENT_TIMESTAMP;

ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastActivityAt" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL;
