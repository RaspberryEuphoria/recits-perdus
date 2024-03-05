/*
  Warnings:

  - You are about to drop the column `moveResullt` on the `MoveOnPosts` table. All the data in the column will be lost.
  - Added the required column `moveResult` to the `MoveOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MoveOnPosts" DROP COLUMN "moveResullt",
ADD COLUMN     "moveResult" "MoveResult" NOT NULL;
