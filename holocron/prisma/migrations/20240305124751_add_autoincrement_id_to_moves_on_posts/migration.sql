/*
  Warnings:

  - The primary key for the `MovesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MovesOnPosts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[moveId]` on the table `MovesOnPosts` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `moveId` on the `DicesOnMoves` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `moveId` to the `MovesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DicesOnMoves" DROP CONSTRAINT "DicesOnMoves_moveId_fkey";

-- DropIndex
DROP INDEX "MovesOnPosts_id_key";

-- AlterTable
ALTER TABLE "DicesOnMoves" DROP COLUMN "moveId",
ADD COLUMN     "moveId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MovesOnPosts" DROP CONSTRAINT "MovesOnPosts_pkey",
ADD COLUMN     "moveId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MovesOnPosts_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "MovesOnPosts_moveId_key" ON "MovesOnPosts"("moveId");

-- AddForeignKey
ALTER TABLE "DicesOnMoves" ADD CONSTRAINT "DicesOnMoves_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "MovesOnPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
