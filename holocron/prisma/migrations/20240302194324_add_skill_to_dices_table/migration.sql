/*
  Warnings:

  - Added the required column `skillBonus` to the `DicesOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillId` to the `DicesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DicesOnPosts" ADD COLUMN     "skillBonus" INTEGER NOT NULL,
ADD COLUMN     "skillId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "MoveResult";

-- AddForeignKey
ALTER TABLE "DicesOnPosts" ADD CONSTRAINT "DicesOnPosts_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
