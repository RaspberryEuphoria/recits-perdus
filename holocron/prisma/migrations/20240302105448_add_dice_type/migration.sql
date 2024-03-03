/*
  Warnings:

  - Added the required column `type` to the `DicesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiceType" AS ENUM ('ACTION', 'CHALLENGE');

-- AlterTable
ALTER TABLE "DicesOnPosts" ADD COLUMN     "type" "DiceType" NOT NULL;
