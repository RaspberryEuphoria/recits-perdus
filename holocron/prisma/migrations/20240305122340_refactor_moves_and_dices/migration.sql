/*
  Warnings:

  - You are about to drop the column `moveId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `skillValue` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `DicesOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoveOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DicesOnPosts" DROP CONSTRAINT "DicesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "MoveOnPosts" DROP CONSTRAINT "MoveOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_skillId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "moveId",
DROP COLUMN "skillId",
DROP COLUMN "skillValue";

-- DropTable
DROP TABLE "DicesOnPosts";

-- DropTable
DROP TABLE "MoveOnPosts";

-- CreateTable
CREATE TABLE "MovesOnPosts" (
    "id" TEXT NOT NULL,
    "moveResult" "MoveResult" NOT NULL,
    "isResolved" BOOLEAN NOT NULL,
    "postId" INTEGER NOT NULL,
    "skillValue" INTEGER,
    "skillId" INTEGER,

    CONSTRAINT "MovesOnPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DicesOnMoves" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "moveId" TEXT NOT NULL,
    "type" "DiceType" NOT NULL,

    CONSTRAINT "DicesOnMoves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovesOnPosts_id_key" ON "MovesOnPosts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MovesOnPosts_postId_key" ON "MovesOnPosts"("postId");

-- AddForeignKey
ALTER TABLE "MovesOnPosts" ADD CONSTRAINT "MovesOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovesOnPosts" ADD CONSTRAINT "MovesOnPosts_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DicesOnMoves" ADD CONSTRAINT "DicesOnMoves_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "MovesOnPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
