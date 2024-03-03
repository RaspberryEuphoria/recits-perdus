/*
  Warnings:

  - You are about to drop the column `skillBonus` on the `DicesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `DicesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `characterSkillId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `skillId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DicesOnPosts" DROP CONSTRAINT "DicesOnPosts_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_characterSkillId_fkey";

-- AlterTable
ALTER TABLE "DicesOnPosts" DROP COLUMN "skillBonus",
DROP COLUMN "skillId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "characterSkillId",
ADD COLUMN     "skillId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
