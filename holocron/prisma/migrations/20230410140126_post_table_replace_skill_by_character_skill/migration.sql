/*
  Warnings:

  - You are about to drop the column `skillId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_skillId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "skillId",
ADD COLUMN     "characterSkillId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_characterSkillId_fkey" FOREIGN KEY ("characterSkillId") REFERENCES "SkillsOnCharacters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
