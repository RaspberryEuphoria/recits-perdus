/*
  Warnings:

  - Added the required column `skillValue` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_skillId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "skillValue" INTEGER NOT NULL,
ALTER COLUMN "skillId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
