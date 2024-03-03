/*
  Warnings:

  - You are about to drop the column `dice` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MoveResult" AS ENUM ('SUCCESS', 'MIXED', 'FAILURE');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "dice",
ADD COLUMN     "moveId" VARCHAR(255),
ADD COLUMN     "moveResult" "MoveResult";

-- CreateTable
CREATE TABLE "DicesOnPosts" (
    "id" SERIAL NOT NULL,
    "dice" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "DicesOnPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DicesOnPosts" ADD CONSTRAINT "DicesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
